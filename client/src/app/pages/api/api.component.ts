import { Component, AfterViewInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@core/config.service';

declare const SwaggerUIBundle: {
  (config: Record<string, unknown>): unknown;
  presets: { apis: unknown };
  SwaggerUIStandalonePreset: unknown;
  plugins: { DownloadUrl: unknown };
};

@Component({
  selector: 'adme-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ApiComponent implements AfterViewInit {
  private configService = inject(ConfigService);

  ngAfterViewInit(): void {
    if (typeof SwaggerUIBundle !== 'undefined') {
      const apiBaseUrl = this.configService.apiBaseUrl;

      SwaggerUIBundle({
        url: `${apiBaseUrl}assets/apidoc/swagger.yaml`,
        dom_id: '#swagger-ui',
        layout: 'BaseLayout',
        docExpansion: 'list',
        defaultModelsExpandDepth: -1,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        requestInterceptor: (req: { url: string }) => {
          // Prepend the base path for API calls in deployments like /adme
          if (apiBaseUrl && apiBaseUrl !== '/' && req.url.includes('/api/v1/')) {
            const url = new URL(req.url);
            if (!url.pathname.startsWith(apiBaseUrl)) {
              url.pathname = apiBaseUrl.replace(/\/$/, '') + url.pathname;
              req.url = url.toString();
            }
          }
          return req;
        }
      });
    }
  }
}
