import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare global {
  interface Window {
    ketcher?: {
      getSmiles(): string;
      setMolecule(mol: string): void;
      editor?: {
        on(event: string, handler: () => void): void;
      };
    };
  }
}

@Component({
  selector: 'adme-sketcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sketcher.component.html',
  styleUrl: './sketcher.component.scss'
})
export class SketcherComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ketcherFrame') ketcherFrame!: ElementRef<HTMLIFrameElement>;
  @Input() apiBaseUrl = '';
  @Input() hasSelectedModels = false;
  @Output() moleculeInput = new EventEmitter<string>();

  private sanitizer = inject(DomSanitizer);
  private ngZone = inject(NgZone);
  private ketcher: Window['ketcher'] | null = null;
  private pollInterval: ReturnType<typeof setInterval> | null = null;

  hasValidMolecule = false;
  ketcherSrc!: SafeResourceUrl;

  ngOnInit(): void {
    const baseUrl = this.apiBaseUrl || '';
    this.ketcherSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      `assets/ketcher/ketcher.html?api_path=${baseUrl}`
    );
  }

  ngAfterViewInit(): void {
    this.ketcherFrame.nativeElement.onload = () => {
      const frameWindow = this.ketcherFrame.nativeElement.contentWindow;
      if (frameWindow) {
        this.ketcher = (frameWindow as Window & { ketcher?: Window['ketcher'] }).ketcher;

        if (this.ketcher?.editor) {
          this.ketcher.editor.on('change', () => {
            this.ngZone.run(() => this.checkMolecule());
          });
        }

        // Poll for molecule changes to catch paste/draw events missed by iframe listener
        this.ngZone.runOutsideAngular(() => {
          this.pollInterval = setInterval(() => {
            const had = this.hasValidMolecule;
            this.checkMoleculeQuiet();
            if (this.hasValidMolecule !== had) {
              this.ngZone.run(() => {}); // trigger change detection only when state changes
            }
          }, 500);
        });
      }
    };
  }

  ngOnDestroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private checkMolecule(): void {
    if (this.ketcher) {
      const smiles = this.ketcher.getSmiles();
      this.hasValidMolecule = !!smiles && smiles.trim().length > 0;
    }
  }

  /** Same as checkMolecule but doesn't trigger change detection (called from outside Angular zone) */
  private checkMoleculeQuiet(): void {
    if (this.ketcher) {
      try {
        const smiles = this.ketcher.getSmiles();
        this.hasValidMolecule = !!smiles && smiles.trim().length > 0;
      } catch {
        // iframe may not be ready yet
      }
    }
  }

  submitMolecule(): void {
    if (this.ketcher) {
      const smiles = this.ketcher.getSmiles();
      if (smiles) {
        this.moleculeInput.emit(smiles);
      }
    }
  }
}
