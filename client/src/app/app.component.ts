import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { ConfigService } from '@core/config.service';
import { AnalyticsService } from '@core/analytics.service';

interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

@Component({
  selector: 'adme-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoadingOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private configService = inject(ConfigService);
  private analyticsService = inject(AnalyticsService);
  
  modelsMenuOpen = signal(false);
  mobileMenuOpen = signal(false);
  
  navItems: NavItem[] = [
    { label: 'Predict', path: '/predictions' },
    { 
      label: 'Models', 
      path: '/models',
      children: [
        { label: 'HLM Stability', path: '/models/hlm' },
        { label: 'RLM Stability', path: '/models/rlm' },
        { label: 'PAMPA pH 7.4', path: '/models/pampa_ph74' },
        { label: 'PAMPA pH 5.0', path: '/models/pampa_ph5' },
        { label: 'PAMPA BBB', path: '/models/pampa_bbb' },
        { label: 'Solubility', path: '/models/solubility' },
        { label: 'HLC Stability', path: '/models/hlc' },
        { label: 'MLC Stability', path: '/models/mlc' },
        { label: 'RLC Stability', path: '/models/rlc' },
        { label: 'CYP450', path: '/models/cyp450' }
      ]
    },
    { label: 'Data', path: '/data' },
    { label: 'API', path: '/api' },
    { label: 'Contact', path: '/contact' }
  ];
  
  toggleModelsMenu(): void {
    this.modelsMenuOpen.update(v => !v);
  }
  
  closeModelsMenu(): void {
    this.modelsMenuOpen.set(false);
  }
  
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }
  
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
  
  trackNav(label: string): void {
    this.analyticsService.sendEvent('click:nav', 'navigation', label);
  }
}
