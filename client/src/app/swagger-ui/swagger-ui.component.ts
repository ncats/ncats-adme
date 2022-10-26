import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare const SwaggerUIBundle: any;

@Component({
  selector: 'api',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwaggerComponent implements OnInit {

  ngOnInit(): void {
    const ui = SwaggerUIBundle({
      url: '/client/assets/apidoc/swagger.yaml',
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      docExpansion: 'list',
      defaultModelsExpandDepth: '-1',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
      ]
    });
  }
}
