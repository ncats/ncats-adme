# PBPK Dose Simulator

An interactive Physiologically-Based Pharmacokinetic (PBPK) simulation tool built with [Streamlit](https://streamlit.io/). It models compartmental drug disposition (plasma, liver, kidney, brain, tumor, muscle, and more) under a variety of dosing regimens, with full non-compartmental analysis (NCA) outputs and optional population variability simulation.

>**Disclaimer:** This is a research and education tool only. It is not validated for clinical decision-making.

Click the following link to access the live app, or follow the directions below to install and run the app locally.

**Live app:** [pbpk-test-2-4w5oxtgnigv5wkptvxmjyu.streamlit.app](https://pbpk-test-2-4w5oxtgnigv5wkptvxmjyu.streamlit.app/)


## 📋 Prerequisites

Before running the project, ensure you have the following installed:
* Python 3.10 or higher
* `pip` (Python package installer)

## ⚙️ Installation

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository
Clone the repository and change to the `pbpk-model` project folder.

```bash
git clone https://github.com/ncats/ncats-adme.git
cd ncats-adme/additional_models/pbpk-model
```

*(Note: Alternatively, create a new folder on your computer and download all contents of the `pbpk-model` folder to this new folder.)*

### 2. Set Up a Virtual Environment (Recommended)
It is highly recommended to use a virtual environment to avoid dependency conflicts.

* **macOS / Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
* **Windows (Command Prompt):**
  ```cmd
  python -m venv venv
  venv\Scripts\activate
  ```
* **Windows (PowerShell):**
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```

### 3. Install Dependencies
Install the required packages, including Streamlit, using the provided `requirements.txt` file:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

## 🏃 How to Run the Application

Launch the Streamlit server from your terminal:
```bash
streamlit run pbpk_app-linearPK.py
```

### 🌐 Accessing the App
Once the server initializes, it will automatically open your default web browser. If it does not, manually open the URLs printed in your terminal:
* **Local URL:** `http://localhost:8501`

### 🛑 Stopping the App
To shut down the local development server, click into your terminal window and press:
* `Ctrl + C`

## 🛠️ Troubleshooting
Visit the official [Streamlit Documentation](https://docs.streamlit.io/) page if you encounter problems installing or running the app locally.