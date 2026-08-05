
from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Dict, List, Tuple, Optional

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import streamlit as st
from scipy.integrate import solve_ivp

# ----------------------------
# Page + styling
# ----------------------------
st.set_page_config(page_title="NCATS DMPK Core | PBPK Simulator", layout="wide")

MODEL_LABEL = "Metarrestin PBPK updated-manuscript model"

CUSTOM_CSS = """
<style>
.header {
  background: linear-gradient(90deg, rgba(11,95,255,0.10), rgba(11,95,255,0.02), rgba(11,95,255,0.10));
  background-size: 200% 200%;
  animation: gradient 10s ease infinite;
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 18px;
  padding: 18px 18px 14px 18px;
}
@keyframes gradient {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}
.badge {
  display:inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(11,95,255,0.25);
  color: rgba(11,95,255,1);
  background: rgba(11,95,255,0.06);
  font-size: 12px;
  margin-left: 10px;
}
.smallnote {
  color: rgba(17,24,39,0.68);
  font-size: 12px;
}
</style>
"""
st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

# Logo: prefer local repo asset if present, else show nothing (avoid broken URLs)
from pathlib import Path as _Path
_logo_candidates = [
    _Path(__file__).parent / "assets" / "dmpk_core_logo.png",
    _Path(__file__).parent / "assets" / "dmpk_logo.png",
]
_logo_path = next((p for p in _logo_candidates if p.exists()), None)

with st.container():
    c1, c2 = st.columns([0.18, 0.82], vertical_alignment="center")
    with c1:
        if _logo_path is not None:
            st.image(str(_logo_path), use_container_width=True)
        else:
            st.empty()
    with c2:
        st.markdown(
            '<div class="header">'
            '<div style="display:flex;align-items:center;gap:10px;">'
            '<h2 style="margin:0;">PBPK Dose Simulator</h2>'
            '<span class="badge">NCATS DMPK Core</span>'
            '</div>'
            '<div class="smallnote">Interactive PBPK simulation with versatile regimens, tissue displays, and full NCA outputs.</div>'
            '</div>',
            unsafe_allow_html=True
        )

st.caption("DISCLAIMER: Research/education tool only. Not validated for clinical decision-making.")

# ----------------------------
# PBPK model
# ----------------------------
@dataclass
class Params:
    # PK
    CL_livC: float = 120.16
    Ka: float = 0.297
    Fab: float = 1.0
    Fup: float = 0.008
    Rbp: float = 1.5

    # Kp values
    PL: float = 53.0
    PK: float = 57.8
    PS: float = 31.77
    PLu: float = 43.2
    PM: float = 5.9
    PP: float = 40.22
    PHe: float = 5.9
    PBR: float = 1.65
    Prest: float = 0.119
    PT: float = 17.8
    PInt: float = 0.119

    # Permeability
    PABRC: float = 0.00143
    PATC: float = 0.217

    # Physiology fractions (L/kg)
    BW: float = 70.0
    VLuC: float = 0.016
    VBloodAC: float = 0.022
    VBloodVC: float = 0.044
    VMC: float = 0.395
    VHeC: float = 0.004
    VBRC: float = 0.023
    VKC: float = 0.004
    VLC: float = 0.019
    VITC: float = 0.032
    VSC: float = 0.002
    VTC: float = 0.0007
    VPC: float = 0.0014

    GFRC: float = 0.007  # L/h/kg
    VrC: float = 0.304  # L/kg, rest-of-body volume fraction from manuscript

    # Cardiac output (L/h/kg) and fractional flows
    QCC: float = 5.42634768
    QMC: float = 0.139829804
    QHeC: float = 0.041316184
    QBRC: float = 0.153309449
    QKC: float = 0.193121016
    QLC: float = 0.227367562
    QITC: float = 0.129996347
    QSC: float = 0.03051901
    QTC: float = 0.0158
    QPC: float = 0.01

    BVBR: float = 0.08
    BVT: float = 0.07

STATE = ["ALu","AM","AHe","AK","ABRb","ABRt","Arest","AS","AP","AGutLu","AI","ATb","ATt","AL","AV"]

def build_derived(p: Params) -> Dict[str, float]:
    BW = p.BW
    VL  = BW * p.VLC
    VK  = BW * p.VKC
    VS  = BW * p.VSC
    VM  = BW * p.VMC
    VP  = BW * p.VPC
    VIT = BW * p.VITC
    VHe = BW * p.VHeC
    VLu = BW * p.VLuC
    VBloodA = BW * p.VBloodAC
    VBloodV = BW * p.VBloodVC

    VBR  = BW * p.VBRC
    VBRb = VBR * p.BVBR
    VBRt = VBR - VBRb

    VT   = BW * p.VTC
    VTb  = VT * p.BVT
    VTt  = VT - VTb

    QC  = p.QCC * BW
    QL  = QC * p.QLC
    QBR = QC * p.QBRC
    QK  = QC * p.QKC
    QS  = QC * p.QSC
    QM  = QC * p.QMC
    QT  = QC * p.QTC
    QP  = QC * p.QPC
    QIT = QC * p.QITC
    QHe = QC * p.QHeC
    Qrest = QC - QL - QBR - QK - QM - QHe - QT

    GFR = p.GFRC * BW
    PABR = p.PABRC * QBR
    PAT  = p.PATC  * QT

    Vrest = BW * p.VrC

    return dict(
        VL=VL, VK=VK, VS=VS, VM=VM, VP=VP, VIT=VIT, VHe=VHe, VLu=VLu,
        VBloodA=VBloodA, VBloodV=VBloodV,
        VBR=VBR, VBRb=VBRb, VBRt=VBRt,
        VT=VT, VTb=VTb, VTt=VTt,
        QC=QC, QL=QL, QBR=QBR, QK=QK, QS=QS, QM=QM, QT=QT, QP=QP, QIT=QIT, QHe=QHe, Qrest=Qrest,
        GFR=GFR, PABR=PABR, PAT=PAT, Vrest=Vrest
    )

def rhs(t: float, y: np.ndarray, p: Params, d: Dict[str, float]) -> np.ndarray:
    VLu, VM, VHe, VK, VBRb, VBRt, Vrest, VS, VP, VIT, VTb, VTt, VL, VBloodV = (
        d["VLu"], d["VM"], d["VHe"], d["VK"], d["VBRb"], d["VBRt"], d["Vrest"], d["VS"], d["VP"], d["VIT"],
        d["VTb"], d["VTt"], d["VL"], d["VBloodV"]
    )
    QC, QM, QHe, QK, QBR, Qrest, QS, QP, QIT, QT, QL, GFR, PABR, PAT = (
        d["QC"], d["QM"], d["QHe"], d["QK"], d["QBR"], d["Qrest"], d["QS"], d["QP"], d["QIT"], d["QT"], d["QL"],
        d["GFR"], d["PABR"], d["PAT"]
    )

    (ALu, AM, AHe, AK, ABRb, ABRt, Arest, AS, AP, AGutLu, AI, ATb, ATt, AL, AV) = y

    # Arterial approximation from lung
    CLu = ALu / VLu
    CA = (CLu / p.PLu) * p.Rbp  # mg/L blood

    CM = AM / VM
    CVM = (CM / p.PM) * p.Rbp

    CHe = AHe / VHe
    CVHe = (CHe / p.PHe) * p.Rbp

    CK = AK / VK
    CVK = (CK / p.PK) * p.Rbp

    # Brain permeability-limited
    CBRb = ABRb / VBRb
    CBRt = ABRt / VBRt
    CVBR = CBRb
    PermBR = PABR * (CBRb - (CBRt / p.PBR) * p.Rbp)

    # Rest
    Crest = Arest / Vrest
    CVrest = (Crest / p.Prest) * p.Rbp

    # Spleen
    CS = AS / VS
    CVS = (CS / p.PS) * p.Rbp

    # Pancreas
    CP = AP / VP
    CVP = (CP / p.PP) * p.Rbp

    # Intestine wall
    CI = AI / VIT
    CVI = (CI / p.PInt) * p.Rbp

    # Tumor permeability-limited
    CTb = ATb / VTb
    CTt = ATt / VTt
    CVT = CTb
    PermT = PAT * (CTb - (CTt / p.PT) * p.Rbp)

    # Liver
    CL = AL / VL
    CVL = (CL / p.PL) * p.Rbp

    # Venous blood
    CV = AV / VBloodV

    # Linear hepatic clearance from the revised manuscript supplement
    liver_clearance = p.CL_livC * VL * ((CVL / p.Rbp) * p.Fup)

    dydt = np.zeros_like(y)
    # Lung
    dydt[STATE.index("ALu")] = QC * (CV - (ALu / VLu) / p.PLu * p.Rbp)
    # Muscle
    dydt[STATE.index("AM")] = QM * (CA - CVM)
    # Heart
    dydt[STATE.index("AHe")] = QHe * (CA - CVHe)
    # Kidney (+ filtration)
    dydt[STATE.index("AK")] = QK * (CA - CVK) - GFR * p.Fup * CK / p.PK
    # Brain blood/tissue
    dydt[STATE.index("ABRb")] = QBR * (CA - CVBR) - PermBR
    dydt[STATE.index("ABRt")] = PermBR
    # Rest
    dydt[STATE.index("Arest")] = Qrest * (CA - CVrest)
    # Spleen
    dydt[STATE.index("AS")] = QS * (CA - CVS)
    # Pancreas
    dydt[STATE.index("AP")] = QP * (CA - CVP)
    # Gut lumen + intestine wall (oral)
    dydt[STATE.index("AGutLu")] = -p.Ka * AGutLu
    dydt[STATE.index("AI")] = QIT * (CA - CVI) + p.Ka * AGutLu * p.Fab
    # Tumor blood/tissue
    dydt[STATE.index("ATb")] = QT * (CA - CVT) - PermT
    dydt[STATE.index("ATt")] = PermT
    # Liver
    dydt[STATE.index("AL")] = (QL - QIT - QS - QP) * CA + QS * CVS + QP * CVP + QIT * CVI - QL * CVL - liver_clearance
    # Venous
    dydt[STATE.index("AV")] = (QBR * CVBR + QM * CVM + QHe * CVHe + QK * CVK + Qrest * CVrest + QL * CVL + QT * CVT) - QC * CV

    return dydt

def results_dataframe(t: np.ndarray, y: np.ndarray, p: Params, d: Dict[str, float]) -> pd.DataFrame:
    df = pd.DataFrame(y, columns=STATE)
    df.insert(0, "time_h", t)

    # Plasma (ng/mL): venous blood -> plasma via Rbp
    CV = df["AV"] / d["VBloodV"]          # mg/L blood
    Cplasma_mgL = CV / p.Rbp              # mg/L plasma
    df["Plasma (ng/mL)"] = Cplasma_mgL * 1000.0

    # Tissue "ng/mL eq" (mg/L tissue * 1000)
    df["Brain tissue (ng/mL eq)"] = (df["ABRt"] / d["VBRt"]) * 1000.0
    df["Brain total (ng/mL eq)"] = ((df["ABRb"] + df["ABRt"]) / d["VBR"]) * 1000.0
    df["Tumor tissue (ng/mL eq)"] = (df["ATt"] / d["VTt"]) * 1000.0
    df["Tumor total (ng/mL eq)"] = ((df["ATb"] + df["ATt"]) / d["VT"]) * 1000.0
    df["Liver (ng/mL eq)"] = (df["AL"] / d["VL"]) * 1000.0
    df["Kidney (ng/mL eq)"] = (df["AK"] / d["VK"]) * 1000.0
    df["Muscle (ng/mL eq)"] = (df["AM"] / d["VM"]) * 1000.0
    df["Model"] = MODEL_LABEL

    return df

def auc_trapz(t: np.ndarray, c: np.ndarray) -> float:
    """Trapezoidal AUC. Uses np.trapezoid (NumPy>=2.0) with fallback."""
    try:
        return float(np.trapezoid(c, t))
    except AttributeError:
        return float(np.trapz(c, t))


def pk_basic(t: np.ndarray, c: np.ndarray) -> Dict[str, float]:
    """Clinically useful PK metrics on a window (t in hours, c in display units)."""
    t = np.asarray(t, dtype=float)
    c = np.asarray(c, dtype=float)
    mask = np.isfinite(t) & np.isfinite(c)
    t, c = t[mask], c[mask]
    if len(t) < 2:
        return {}
    cmax = float(np.max(c))
    tmax = float(t[np.argmax(c)])
    auc = float(auc_trapz(t, c))
    dur = float(t[-1] - t[0])
    cavg = float(auc / dur) if dur > 0 else float("nan")
    cmin = float(np.min(c))
    ctau = float(c[-1])
    return {"Cmax": cmax, "Tmax": tmax, "AUC": auc, "Cavg": cavg, "Cmin": cmin, "Ctau": ctau, "Duration": dur}

def last_complete_interval(dose_events: List[Tuple[float, float]], t_end_h: float) -> Optional[Tuple[float, float]]:
    """Return the last full dosing interval contained within the regimen.

    For variable schedules (for example Monday/Wednesday/Friday), this uses the
    last two dose times that occur on or before t_end_h. That matches how AUCtau
    is typically computed for NCA: over one complete interval, not the whole
    simulation horizon.
    """
    times = sorted({float(t) for t, _ in dose_events if float(t) <= float(t_end_h)})
    if len(times) < 2:
        return None
    return float(times[-2]), float(times[-1])


def infer_simulation_interval(dose_events: List[Tuple[float, float]]) -> float:
    """Infer a representative dosing interval in hours from the event times.

    Uses the smallest positive gap between consecutive doses, which matches the
    repeating maintenance interval for regular schedules and gives a stable
    single value for MWF regimens.
    """
    times = sorted({float(t) for t, _ in dose_events})
    deltas = [b - a for a, b in zip(times[:-1], times[1:]) if b > a]
    return float(min(deltas)) if deltas else float('nan')


def _sigma_from_cv(cv: float) -> float:
    cv = max(0.0, float(cv))
    return float(np.sqrt(np.log(1.0 + cv * cv)))  # lognormal sigma

def sample_params_lognormal(base: Params, n: int, seed: int, cv_map: Dict[str, float]) -> List[Params]:
    """
    Create n Params with lognormal variability for selected parameters.
    cv_map values are fractional CVs (e.g., 0.3 for 30%).
    """
    rng = np.random.default_rng(int(seed))
    out: List[Params] = []
    for _ in range(int(n)):
        p = Params(**base.__dict__)
        for name, cv in cv_map.items():
            if not hasattr(p, name):
                continue
            mu = float(getattr(p, name))
            if mu <= 0:
                continue
            sigma = _sigma_from_cv(cv)
            z = rng.normal(0.0, 1.0)
            # mean-preserving lognormal multiplier
            mult = float(np.exp(z * sigma - 0.5 * sigma * sigma))
            setattr(p, name, mu * mult)
        out.append(p)
    return out

def interp_to_grid(t_src: np.ndarray, y_src: np.ndarray, t_grid: np.ndarray) -> np.ndarray:
    """1D linear interpolation with fill at bounds."""
    t_src = np.asarray(t_src, dtype=float)
    y_src = np.asarray(y_src, dtype=float)
    t_grid = np.asarray(t_grid, dtype=float)
    idx = np.argsort(t_src)
    t_src, y_src = t_src[idx], y_src[idx]
    return np.interp(t_grid, t_src, y_src, left=y_src[0], right=y_src[-1])

def terminal_slope(t: np.ndarray, c: np.ndarray, n_points: int = 3) -> Optional[Dict[str, float]]:
    """Log-linear regression on last n positive points."""
    t = np.asarray(t, dtype=float)
    c = np.asarray(c, dtype=float)
    mask = np.isfinite(t) & np.isfinite(c) & (c > 0)
    t, c = t[mask], c[mask]
    if len(t) < max(3, int(n_points)):
        return None
    t_seg = t[-int(n_points):]
    c_seg = c[-int(n_points):]
    ln_c = np.log(c_seg)
    b, a = np.polyfit(t_seg, ln_c, 1)  # lnC = a + b t
    lam = float(-b)
    if not np.isfinite(lam) or lam <= 0:
        return None
    ln_pred = a + b * t_seg
    ss_res = float(np.sum((ln_c - ln_pred) ** 2))
    ss_tot = float(np.sum((ln_c - float(np.mean(ln_c))) ** 2))
    r2 = 1.0 - ss_res / ss_tot if ss_tot > 0 else float("nan")
    return {"lambda_z": lam, "r2": float(r2), "n_points": int(n_points), "t_start": float(t_seg[0]), "t_end": float(t_seg[-1])}

def terminal_slope_auto(t: np.ndarray, c: np.ndarray, n_min: int = 3, n_max: int = 10) -> Optional[Dict[str, float]]:
    """Pick best lambda_z among last n points by highest R² (ties -> more points)."""
    best = None
    for n in range(int(n_min), int(n_max) + 1):
        info = terminal_slope(t, c, n_points=n)
        if info is None:
            continue
        if best is None:
            best = info
            continue
        r2, br2 = info.get("r2", -np.inf), best.get("r2", -np.inf)
        if (r2 > br2 + 1e-9) or (abs(r2 - br2) <= 1e-9 and info.get("n_points", 0) > best.get("n_points", 0)):
            best = info
    return best

def nca_full(t: np.ndarray, c: np.ndarray, dose_mg: Optional[float] = None) -> Dict[str, float]:
    """Full NCA summary over the provided time grid t (hours) and concentration c."""
    t = np.asarray(t, dtype=float)
    c = np.asarray(c, dtype=float)
    mask = np.isfinite(t) & np.isfinite(c)
    t, c = t[mask], c[mask]

    out: Dict[str, float] = {}
    if len(t) < 2:
        return out

    out["Cmax"] = float(np.max(c))
    out["Tmax"] = float(t[np.argmax(c)])
    out["Cmin"] = float(np.min(c))
    out["Tmin"] = float(t[np.argmin(c)])
    out["Clast"] = float(c[-1])
    out["Tlast"] = float(t[-1])

    out["AUC0-last"] = auc_trapz(t, c)
    out["AUMC0-last"] = auc_trapz(t, t * c)

    dur = float(t[-1] - t[0])
    out["Cavg"] = float(out["AUC0-last"] / dur) if dur > 0 else float("nan")

    if np.isfinite(out["Cavg"]) and out["Cavg"] != 0:
        out["Swing%"] = float(100.0 * (out["Cmax"] - out["Cmin"]) / out["Cavg"])
    if np.isfinite(out["Cmin"]) and out["Cmin"] > 0:
        out["Peak/Trough"] = float(out["Cmax"] / out["Cmin"])

    if dose_mg is not None:
        out["Dose (mg)"] = float(dose_mg)

    return out

def build_regimen(
    schedule_type: str,
    ld_mg: float,
    md_mg: float,
    days_total: int,
    interval_h: float,
    n_loading_doses: int,
    loading_interval_h: float,
    custom_csv: str = ""
) -> List[Tuple[float, float]]:
    """Return list of (time_h, dose_mg) oral doses to AGutLu."""
    events: List[Tuple[float, float]] = []

    # Loading phase at t=0, ld_int, 2*ld_int, ...
    for i in range(max(1, int(n_loading_doses))):
        events.append((i * float(loading_interval_h), float(ld_mg)))

    # Maintenance starts automatically after last loading dose
    maint_start = float(max(1, int(n_loading_doses)) * float(loading_interval_h))
    t_end = float(days_total) * 24.0

    if schedule_type == "Single dose only":
        return [(0.0, float(ld_mg))]

    if schedule_type == "Custom times (CSV: time_h,dose_mg)":
        ev: List[Tuple[float, float]] = []
        for line in custom_csv.strip().splitlines():
            line = line.strip()
            if not line:
                continue
            parts = [p.strip() for p in line.split(",")]
            if len(parts) != 2:
                continue
            try:
                ev.append((float(parts[0]), float(parts[1])))
            except ValueError:
                continue
        return sorted(ev)

    if schedule_type == "MWF (Mon/Wed/Fri)":
        dosing_dows = {0, 2, 4}  # Mon Wed Fri (day 0 = Monday)
        for day in range(0, int(days_total) + 1):
            if day % 7 in dosing_dows:
                t = day * 24.0
                if t >= maint_start and t > 0:
                    events.append((t, float(md_mg)))
        return sorted(events)

    # Interval-based schedules
    if schedule_type == "Daily (q24h)":
        interval_h = 24.0
    elif schedule_type == "BID (q12h)":
        interval_h = 12.0
    elif schedule_type == "TID (q8h)":
        interval_h = 8.0
    elif schedule_type == "Weekly (q168h)":
        interval_h = 168.0

    t = maint_start
    while t <= t_end + 1e-9:
        events.append((t, float(md_mg)))
        t += float(interval_h)

    return sorted(events)

def simulate(p: Params, t_end_h: float, dose_events: List[Tuple[float, float]], dt_out_h: float = 0.1) -> pd.DataFrame:
    d = build_derived(p)
    y0 = np.zeros(len(STATE), dtype=float)

    dose_events = sorted(dose_events, key=lambda x: x[0])
    dose_map: Dict[float, float] = {}
    for t, dose in dose_events:
        dose_map.setdefault(float(t), 0.0)
        dose_map[float(t)] += float(dose)

    boundaries = sorted({0.0, *dose_map.keys(), float(t_end_h)})
    boundaries = [t for t in boundaries if 0.0 <= t <= t_end_h]
    if boundaries[0] != 0.0:
        boundaries = [0.0] + boundaries
    if boundaries[-1] != t_end_h:
        boundaries = boundaries + [float(t_end_h)]

    t_all: List[float] = []
    y_all: List[np.ndarray] = []
    y = y0.copy()

    # apply dose at t=0 before integrating
    if 0.0 in dose_map:
        y[STATE.index("AGutLu")] += dose_map[0.0]

    for i in range(len(boundaries) - 1):
        t0 = boundaries[i]
        t1 = boundaries[i + 1]
        n = max(2, int(math.ceil((t1 - t0) / dt_out_h)) + 1)
        t_eval = np.linspace(t0, t1, n)

        sol = solve_ivp(lambda tt, yy: rhs(tt, yy, p, d), (t0, t1), y, method="LSODA",
                        rtol=1e-6, atol=1e-9, t_eval=t_eval)

        if not t_all:
            t_all.extend(sol.t.tolist())
            y_all.extend(sol.y.T)
        else:
            t_all.extend(sol.t[1:].tolist())
            y_all.extend(sol.y.T[1:])

        y = sol.y[:, -1].copy()

        if t1 in dose_map and t1 != t_end_h:
            y[STATE.index("AGutLu")] += dose_map[t1]

    return results_dataframe(np.asarray(t_all), np.asarray(y_all), p, d)

# ----------------------------
# Sidebar
# ----------------------------
with st.sidebar:
    st.header("Dose regimen")
    schedule_type = st.selectbox(
        "Schedule type",
        [
            "Daily (q24h)",
            "BID (q12h)",
            "TID (q8h)",
            "Every X hours (qXh)",
            "Weekly (q168h)",
            "MWF (Mon/Wed/Fri)",
            "Custom times (CSV: time_h,dose_mg)",
            "Single dose only",
        ],
    )

    days_total = st.number_input("Simulation horizon (days)", min_value=1, max_value=120, value=28, step=1)

    st.subheader("Loading + maintenance")
    ld_mg = st.number_input("Loading dose (mg)", min_value=0.0, value=24.0, step=0.5)
    n_ld = st.number_input("Number of loading doses", min_value=1, max_value=10, value=1, step=1)
    ld_int = st.number_input("Loading dose interval (h)", min_value=1.0, max_value=168.0, value=24.0, step=1.0)
    md_mg = st.number_input("Maintenance dose (mg)", min_value=0.0, value=8.0, step=0.5)

    if schedule_type == "Every X hours (qXh)":
        interval_h = st.number_input("Maintenance interval (h)", min_value=1.0, max_value=168.0, value=48.0, step=1.0)
    else:
        interval_h = 24.0

    custom_csv = ""
    if schedule_type == "Custom times (CSV: time_h,dose_mg)":
        custom_csv = st.text_area("Dose events", value="0,24\n48,8\n96,8\n144,8\n192,8", height=140)

    st.divider()
    st.header("Model options")
    pop_enable = st.checkbox("Population simulation (adds variability)", value=False)

    BW = st.number_input("Body weight (kg)", min_value=30.0, max_value=200.0, value=70.0, step=1.0)

    with st.expander("Advanced PK parameters", expanded=False):
        Fab = st.slider("Fab (fraction absorbed)", min_value=0.0, max_value=1.0, value=1.0, step=0.05)
        Ka = st.number_input("Ka (1/h)", min_value=0.001, max_value=5.0, value=0.297, step=0.01)
        CL_livC = st.number_input("CL_livC (L/h/kg liver wt)", min_value=0.01, max_value=500.0, value=120.16, step=1.0)
        Fup = st.number_input("Fup", min_value=0.0001, max_value=0.2, value=0.008, step=0.001, format="%.4f")
        Rbp = st.number_input("Rbp", min_value=0.2, max_value=3.0, value=1.5, step=0.1)

    if pop_enable:
        with st.expander("Population settings", expanded=True):
            n_subj = st.number_input("Number of individuals", min_value=5, max_value=200, value=50, step=5)
            seed = st.number_input("Random seed", min_value=1, max_value=999999, value=12345, step=1)
            st.caption("Variability is applied as lognormal CV to selected parameters (mean-preserving).")
            cv_ka = st.slider("CV% Ka", min_value=0, max_value=200, value=30, step=5) / 100.0
            cv_cl = st.slider("CV% CL_livC", min_value=0, max_value=200, value=40, step=5) / 100.0
            cv_fup = st.slider("CV% Fup", min_value=0, max_value=200, value=20, step=5) / 100.0
            cv_rbp = st.slider("CV% Rbp", min_value=0, max_value=200, value=10, step=5) / 100.0
            show_individuals = st.checkbox("Overlay a few individual curves", value=False)
            n_overlay = st.number_input("Individuals to overlay", min_value=0, max_value=30, value=10, step=1)
    else:
        n_subj = 0
        seed = 12345
        cv_ka = cv_cl = cv_fup = cv_rbp = 0.0
        show_individuals = False
        n_overlay = 0


    st.divider()
    st.header("Display")
    units = st.radio("Concentration units", options=["ng/mL (default)", "nM"], horizontal=True)
    MW_G_MOL = 474.5961
    st.caption(f"Molecular weight fixed for nM conversion: {MW_G_MOL:.4f} g/mol")

    tissue_options_ng = [
        "Plasma (ng/mL)",
        "Tumor tissue (ng/mL eq)",
        "Tumor total (ng/mL eq)",
        "Brain tissue (ng/mL eq)",
        "Brain total (ng/mL eq)",
        "Liver (ng/mL eq)",
        "Kidney (ng/mL eq)",
        "Muscle (ng/mL eq)",
    ]
    tissue_options_nm = [
        "Plasma (nM)",
        "Tumor tissue (nM eq)",
        "Tumor total (nM eq)",
        "Brain tissue (nM eq)",
        "Brain total (nM eq)",
        "Liver (nM eq)",
        "Kidney (nM eq)",
        "Muscle (nM eq)",
    ]
    tissue_options = tissue_options_nm if units == "nM" else tissue_options_ng
    default_tissues = ["Plasma (nM)", "Tumor total (nM eq)"] if units == "nM" else ["Plasma (ng/mL)", "Tumor total (ng/mL eq)"]

    tissues = st.multiselect("Curves to show", options=tissue_options, default=default_tissues)
    y_log = st.checkbox("Log scale (y-axis)", value=False)

    st.divider()
    st.header("PK window")
    pk_window = st.selectbox("Compute PK metrics over", ["Whole simulation (0–t)", "Last dosing interval (tau)", "Custom window"])
    custom_t0 = st.number_input("Custom window start (h)", min_value=0.0, value=0.0, step=1.0)
    custom_t1 = st.number_input("Custom window end (h)", min_value=0.0, value=48.0, step=1.0)

# ----------------------------
# Build + simulate
# ----------------------------
p = Params(
    BW=float(BW),
    Fab=float(Fab),
    Ka=float(Ka),
    CL_livC=float(CL_livC),
    Fup=float(Fup),
    Rbp=float(Rbp),
)

dose_events = build_regimen(
    schedule_type=schedule_type,
    ld_mg=float(ld_mg),
    md_mg=float(md_mg),
    days_total=int(days_total),
    interval_h=float(interval_h),
    n_loading_doses=int(n_ld),
    loading_interval_h=float(ld_int),
    custom_csv=custom_csv,
)

t_end_h = float(days_total) * 24.0

with st.spinner("Simulating PBPK model…"):
    df = simulate(p, t_end_h=t_end_h, dose_events=dose_events, dt_out_h=0.1)

# Add run metadata so the exported files clearly reflect the selected regimen and model settings.
df["Dose regimen"] = schedule_type
df["Dose events n"] = len(dose_events)
df["Loading dose (mg)"] = float(ld_mg)
df["Maintenance dose (mg)"] = float(md_mg)
df["Loading doses"] = int(n_ld)
df["Loading interval (h)"] = float(ld_int)
df["Simulation horizon (days)"] = int(days_total)
df["Model label"] = MODEL_LABEL

# Unit conversion (display only): create parallel nM columns when requested
if units == "nM":
    mw = 474.5961
    factor = 1000.0 / mw  # nM per (ng/mL)
    for col in list(df.columns):
        if col.endswith("(ng/mL)"):
            df[col.replace("(ng/mL)", "(nM)")] = df[col] * factor
        elif col.endswith("(ng/mL eq)"):
            df[col.replace("(ng/mL eq)", "(nM eq)")] = df[col] * factor


# ----------------------------
# Population simulation (optional)
# ----------------------------
df_pop = None
pop_metrics = None
pop_curves = None

if pop_enable and int(n_subj) >= 5:
    cv_map = {"Ka": float(cv_ka), "CL_livC": float(cv_cl), "Fup": float(cv_fup), "Rbp": float(cv_rbp)}
    samples = sample_params_lognormal(p, int(n_subj), int(seed), cv_map)

    t_grid = df["time_h"].to_numpy()
    cols_to_summarize = [c for c in tissues if c in df.columns]

    mat = {col: [] for col in cols_to_summarize}
    plasma_series = "Plasma (nM)" if units == "nM" else "Plasma (ng/mL)"
    if plasma_series not in df.columns:
        plasma_series = "Plasma (ng/mL)"

    pk_rows = []
    overlay = []

    # Determine PK window boundaries (reuse same logic as PK tab)
    # (t0,t1) exist from sidebar inputs; for population metrics we compute later in PK tab as well.
    for ps in samples:
        dfi = simulate(ps, t_end_h=t_end_h, dose_events=dose_events, dt_out_h=0.1)

        if units == "nM":
            mw = 474.5961
            factor = 1000.0 / mw
            for col in list(dfi.columns):
                if col.endswith("(ng/mL)"):
                    dfi[col.replace("(ng/mL)", "(nM)")] = dfi[col] * factor
                elif col.endswith("(ng/mL eq)"):
                    dfi[col.replace("(ng/mL eq)", "(nM eq)")] = dfi[col] * factor

        for col in cols_to_summarize:
            yi = interp_to_grid(dfi["time_h"].to_numpy(), dfi[col].to_numpy(), t_grid)
            mat[col].append(yi)

        if show_individuals and len(overlay) < int(n_overlay):
            overlay.append({"time_h": dfi["time_h"].to_numpy(), "series": {col: dfi[col].to_numpy() for col in cols_to_summarize}})

    qdf = pd.DataFrame({"time_h": t_grid})
    for col in cols_to_summarize:
        arr = np.asarray(mat[col])
        if arr.size == 0:
            continue
        qdf[f"{col} P05"] = np.percentile(arr, 5, axis=0)
        qdf[f"{col} P50"] = np.percentile(arr, 50, axis=0)
        qdf[f"{col} P95"] = np.percentile(arr, 95, axis=0)
    df_pop = qdf
    pop_curves = overlay if overlay else None


def tissue_nca_table(df: pd.DataFrame, tissue_cols: List[str]) -> pd.DataFrame:
    """Compute basic NCA metrics for each tissue series over the full simulation."""
    rows = []
    t = df["time_h"].to_numpy(dtype=float)
    for col in tissue_cols:
        if col not in df.columns:
            continue
        metrics = nca_full(t, df[col].to_numpy(dtype=float))
        row = {"series": col}
        row.update(metrics)
        rows.append(row)
    return pd.DataFrame(rows)



def simulation_export_frame(df: pd.DataFrame, dose_events: List[Tuple[float, float]]) -> pd.DataFrame:
    """Build the flat simulation export table used in the downloadable CSV.

    The export matches the ideal file shape:
    time_h, concentration outputs, Model, and regimen descriptors.
    Internal state variables and metadata preambles are excluded.
    """
    cols = [
        "time_h",
        "Plasma (ng/mL)",
        "Brain tissue (ng/mL eq)",
        "Brain total (ng/mL eq)",
        "Tumor tissue (ng/mL eq)",
        "Tumor total (ng/mL eq)",
        "Liver (ng/mL eq)",
        "Kidney (ng/mL eq)",
        "Muscle (ng/mL eq)",
        "Model",
        "Dose regimen",
        "Dose events n",
        "Loading dose (mg)",
        "Maintenance dose (mg)",
        "Loading doses",
        "Simulation horizon (days)",
    ]

    export_df = pd.DataFrame({
        "time_h": df["time_h"].to_numpy(),
        "Plasma (ng/mL)": df["Plasma (ng/mL)"].to_numpy(),
        "Brain tissue (ng/mL eq)": df["Brain tissue (ng/mL eq)"].to_numpy(),
        "Brain total (ng/mL eq)": df["Brain total (ng/mL eq)"].to_numpy(),
        "Tumor tissue (ng/mL eq)": df["Tumor tissue (ng/mL eq)"].to_numpy(),
        "Tumor total (ng/mL eq)": df["Tumor total (ng/mL eq)"].to_numpy(),
        "Liver (ng/mL eq)": df["Liver (ng/mL eq)"].to_numpy(),
        "Kidney (ng/mL eq)": df["Kidney (ng/mL eq)"].to_numpy(),
        "Muscle (ng/mL eq)": df["Muscle (ng/mL eq)"].to_numpy(),
        "Model": df["Model"].to_numpy() if "Model" in df.columns else np.full(len(df), MODEL_LABEL),
        "Dose regimen": df["Dose regimen"].to_numpy() if "Dose regimen" in df.columns else np.full(len(df), ""),
        "Dose events n": df["Dose events n"].to_numpy() if "Dose events n" in df.columns else np.full(len(df), len(dose_events)),
        "Loading dose (mg)": df["Loading dose (mg)"].to_numpy() if "Loading dose (mg)" in df.columns else np.full(len(df), np.nan),
        "Maintenance dose (mg)": df["Maintenance dose (mg)"].to_numpy() if "Maintenance dose (mg)" in df.columns else np.full(len(df), np.nan),
        "Loading doses": df["Loading doses"].to_numpy() if "Loading doses" in df.columns else np.full(len(df), np.nan),
        "Simulation horizon (days)": df["Simulation horizon (days)"].to_numpy() if "Simulation horizon (days)" in df.columns else np.full(len(df), np.nan),
    })

    return export_df[cols].copy()


def build_simulation_csv(df: pd.DataFrame, dose_events: List[Tuple[float, float]], p: Params, series: str) -> str:
    """Build the flat CSV string for the simulation export."""
    _ = p, series  # kept for backward compatibility with older call sites
    return simulation_export_frame(df, dose_events).to_csv(index=False)


def build_nca_csv(
    nca_tissue_df: pd.DataFrame,
    dose_events: List[Tuple[float, float]],
    p: Params,
    dose_level_mg: float,
    simulation_interval_h: float,
) -> str:
    """Build a CSV string for tissue NCA results.

    The exported file includes only two metadata rows, then a reduced NCA table.
    """
    from io import StringIO

    meta_rows = [
        ["field", "value"],
        ["dose_level_mg", dose_level_mg],
        ["simulation_interval_h", simulation_interval_h],
    ]

    keep_cols = [
        "series",
        "Cmax",
        "Tmax",
        "AUC0-last",
        "Cavg",
        "Ctau",
        "Clast",
        "Tlast",
        "AUMC0-last",
        "Peak/Trough",
        "Dose (mg)",
    ]
    filtered = nca_tissue_df.copy()
    filtered = filtered[[c for c in keep_cols if c in filtered.columns]]

    buf = StringIO()
    pd.DataFrame(meta_rows).to_csv(buf, index=False, header=False)
    buf.write("\n")
    filtered.to_csv(buf, index=False)
    return buf.getvalue()




# ----------------------------
# Tabs
# ----------------------------
tab_sim, tab_pk, tab_about = st.tabs(["Simulation", "PK metrics", "About"])

with tab_sim:
    left, right = st.columns([2.2, 1.0], gap="large")

    with left:
        st.subheader("Concentration–time profiles")
        fig = go.Figure()

        if pop_enable and df_pop is not None:
            # Population band (P05–P95) + median for each selected tissue
            for series in tissues:
                p05 = f"{series} P05"
                p50 = f"{series} P50"
                p95 = f"{series} P95"
                if p05 in df_pop.columns and p50 in df_pop.columns and p95 in df_pop.columns:
                    fig.add_trace(go.Scatter(x=df_pop["time_h"], y=df_pop[p95], mode="lines",
                                             line=dict(width=0), showlegend=False, hoverinfo="skip"))
                    fig.add_trace(go.Scatter(x=df_pop["time_h"], y=df_pop[p05], mode="lines",
                                             line=dict(width=0), fill="tonexty",
                                             fillcolor="rgba(0,0,0,0.10)", showlegend=False, hoverinfo="skip"))
                    fig.add_trace(go.Scatter(x=df_pop["time_h"], y=df_pop[p50], mode="lines",
                                             name=f"{series} (median)",
                                             hovertemplate="t=%{x:.2f} h<br>%{y:.3g}<extra>"+series+" median</extra>"))

            if pop_curves is not None:
                for subj in pop_curves:
                    for series in tissues:
                        if series in subj["series"]:
                            fig.add_trace(go.Scatter(x=subj["time_h"], y=subj["series"][series],
                                                     mode="lines", line=dict(width=1),
                                                     opacity=0.25, showlegend=False, hoverinfo="skip"))
        else:
            for series in tissues:
                if series in df.columns:
                    fig.add_trace(go.Scatter(x=df["time_h"], y=df[series], mode="lines", name=series,
                                             hovertemplate="t=%{x:.2f} h<br>%{y:.3g}<extra>"+series+"</extra>"))

        fig.update_layout(height=520, margin=dict(l=10, r=10, t=10, b=10),
                          legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="left", x=0),
                          xaxis_title="Time (h)", yaxis_title="Concentration")
        if y_log:
            fig.update_yaxes(type="log")
        st.plotly_chart(fig, use_container_width=True)

    with right:
        st.subheader("Dose events")
        st.dataframe(pd.DataFrame(dose_events, columns=["time_h", "dose_mg"]), hide_index=True, use_container_width=True)

        st.subheader("Quick KPIs (Plasma)")
        plasma_series = "Plasma (nM)" if units == "nM" else "Plasma (ng/mL)"
        c = df[plasma_series].to_numpy()
        t = df["time_h"].to_numpy()
        st.metric(f"Cmax ({'nM' if units=='nM' else 'ng/mL'})", f"{float(np.max(c)):.4g}")
        st.metric("Tmax (h)", f"{float(t[np.argmax(c)]):.4g}")
        st.metric(f"AUC0–t ({'nM·h' if units=='nM' else 'ng·h/mL'})", f"{auc_trapz(t, c):.4g}")


with tab_pk:
    st.subheader("Clinically useful PK summary")

    series_options = [c for c in df.columns if c.endswith("(ng/mL)") or c.endswith("(ng/mL eq)") or c.endswith("(nM)") or c.endswith("(nM eq)")]
    default_series = "Plasma (nM)" if units == "nM" else "Plasma (ng/mL)"
    if default_series not in series_options:
        default_series = series_options[0] if series_options else "Plasma (ng/mL)"
    series = st.selectbox("Series", options=series_options, index=series_options.index(default_series) if default_series in series_options else 0)

    interval = last_complete_interval(dose_events, t_end_h)

    if pk_window == "Whole simulation (0–t)":
        t0, t1 = 0.0, float(t_end_h)
    elif pk_window == "Last dosing interval (tau)":
        if interval is None:
            st.warning("Not enough doses to infer a complete interval. Using 0–t.")
            t0, t1 = 0.0, float(t_end_h)
        else:
            t0, t1 = interval
    else:
        t0, t1 = float(custom_t0), float(custom_t1)

    sub = df[(df.time_h >= t0) & (df.time_h <= t1)].copy()
    pk = {}
    if len(sub) < 2:
        st.warning("Window has insufficient points.")
    else:
        t_win = (sub.time_h.to_numpy() - float(t0))
        c_win = sub[series].to_numpy()
        pk = pk_basic(t_win, c_win)

        lam_info = terminal_slope_auto(t_win, c_win, n_min=3, n_max=8)
        t_half = float(np.log(2.0) / lam_info["lambda_z"]) if lam_info is not None else None

        conc_unit = "nM" if units == "nM" else "ng/mL"
        auc_unit = "nM·h" if units == "nM" else "ng·h/mL"

        cols = st.columns(6)
        cols[0].metric(f"Cmax ({conc_unit})", f"{pk['Cmax']:.4g}")
        cols[1].metric("Tmax (h)", f"{pk['Tmax']:.4g}")
        cols[2].metric(f"AUC ({auc_unit})", f"{pk['AUC']:.4g}")
        cols[3].metric(f"Cavg ({conc_unit})", f"{pk['Cavg']:.4g}")
        cols[4].metric(f"Ctau ({conc_unit})", f"{pk['Ctau']:.4g}")
        cols[5].metric("t½ (h)", f"{t_half:.4g}" if t_half is not None else "—")

        st.caption(f"Computed over **{t0:.2f}–{t1:.2f} h** for **{series}**.")

        if pop_enable and df_pop is not None:
            st.divider()
            st.subheader("Population variability (PK metrics)")

            # Run PK metrics across individuals using the same sampled params
            cv_map = {"Ka": float(cv_ka), "CL_livC": float(cv_cl), "Fup": float(cv_fup), "Rbp": float(cv_rbp)}
            samples = sample_params_lognormal(p, int(n_subj), int(seed), cv_map)

            rows = []
            for ps in samples:
                dfi = simulate(ps, t_end_h=t_end_h, dose_events=dose_events, dt_out_h=0.1)
                if units == "nM":
                    mw = 474.5961
                    factor = 1000.0 / mw
                    for col in list(dfi.columns):
                        if col.endswith("(ng/mL)"):
                            dfi[col.replace("(ng/mL)", "(nM)")] = dfi[col] * factor
                        elif col.endswith("(ng/mL eq)"):
                            dfi[col.replace("(ng/mL eq)", "(nM eq)")] = dfi[col] * factor
                sub_i = dfi[(dfi.time_h >= t0) & (dfi.time_h <= t1)].copy()
                if len(sub_i) < 2:
                    continue
                t_i = (sub_i.time_h.to_numpy() - float(t0))
                c_i = sub_i[series].to_numpy()
                pk_i = pk_basic(t_i, c_i)
                lam_i = terminal_slope_auto(t_i, c_i, n_min=3, n_max=8)
                pk_i["t_half"] = float(np.log(2.0) / lam_i["lambda_z"]) if lam_i is not None else np.nan
                rows.append(pk_i)

            pop_df = pd.DataFrame(rows)

            def q(vals, pctl):
                vals = np.asarray(vals, dtype=float)
                vals = vals[np.isfinite(vals)]
                return float(np.percentile(vals, pctl)) if len(vals) else float("nan")

            fields = [("Cmax", conc_unit), ("AUC", auc_unit), ("Cavg", conc_unit), ("Ctau", conc_unit), ("t_half", "h")]
            summ_rows = []
            for f, u in fields:
                if f in pop_df.columns:
                    summ_rows.append({"Metric": f"{f} ({u})", "P05": q(pop_df[f], 5), "Median": q(pop_df[f], 50), "P95": q(pop_df[f], 95)})
            st.dataframe(pd.DataFrame(summ_rows), hide_index=True, use_container_width=True)

            with st.expander("Show distribution plots", expanded=False):
                metric_to_plot = st.selectbox("Metric to plot", options=[r["Metric"] for r in summ_rows] if summ_rows else ["Cmax"])
                # map back
                key_map = {f"{f} ({u})": f for f, u in fields}
                k = key_map.get(metric_to_plot, "Cmax")
                if k in pop_df.columns:
                    vals = pop_df[k].to_numpy()
                    vals = vals[np.isfinite(vals)]
                    if len(vals):
                        figH = go.Figure()
                        figH.add_trace(go.Histogram(x=vals, nbinsx=30, name=metric_to_plot))
                        figH.update_layout(height=360, margin=dict(l=10,r=10,t=10,b=10),
                                           xaxis_title=metric_to_plot, yaxis_title="Count")
                        st.plotly_chart(figH, use_container_width=True)

    st.divider()
    st.subheader("Export")

    tissue_cols_export = [c for c in df.columns if c.endswith("(ng/mL)") or c.endswith("(ng/mL eq)") or c.endswith("(nM)") or c.endswith("(nM eq)")]
    nca_tissue_df = tissue_nca_table(df, tissue_cols_export)
    sim_csv = build_simulation_csv(df, dose_events, p, series)
    dose_level_mg = float(ld_mg if schedule_type == "Single dose only" else md_mg)
    simulation_interval_h = infer_simulation_interval(dose_events)
    nca_csv = build_nca_csv(nca_tissue_df, dose_events, p, dose_level_mg=dose_level_mg, simulation_interval_h=simulation_interval_h)

    c1, c2 = st.columns(2)
    with c1:
        st.download_button(
            "Download simulation CSV",
            data=sim_csv.encode("utf-8"),
            file_name="pbpk_simulation_updated.csv",
            mime="text/csv",
            use_container_width=True,
        )
    with c2:
        st.download_button(
            "Download NCA CSV",
            data=nca_csv.encode("utf-8"),
            file_name="pbpk_nca_results.csv",
            mime="text/csv",
            use_container_width=True,
        )

with tab_about:
    st.subheader("Notes")
    st.markdown(
        """
- **Maintenance start time** input was removed by design. Maintenance dosing begins automatically **after the last loading dose**.
- PK summary is computed on the selected **PK window**. The "Last dosing interval" option now uses the last complete dosing interval in the schedule.
- For **nM display**, the molecular weight is fixed at **474.5961 g/mol**.  
  Conversion used: **nM = (ng/mL) × 1000 / 474.5961**.
- Downloaded CSV files now include the updated model outputs plus dose events and a tissue-level NCA section.
- Apparent **CL/F and Vz/F** are only computed when the selected series is in **ng/mL** units.
        """
    )
