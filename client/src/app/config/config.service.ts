import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config.model';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { DEPLOY_URL } from '../utilities/deploy-url';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    // tslint:disable-next-line:variable-name
    private _configData: Config;

    constructor(
        private http: HttpClient,
        @Inject(APP_BASE_HREF) public baseHref: string,
        @Inject(DEPLOY_URL) private deployUrl: string
    ) { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load(): Promise<any> {
        this._configData = null;
        const configFilePath = environment.configFileLocation ?
            environment.configFileLocation : `${this.deployUrl || '/'}assets/data/config.json`;

        return this.http
            .get(configFilePath)
            .toPromise()
            .then((config: Config) => {
                if (config.apiBaseUrl == null && environment.apiBaseUrl != null) {
                    config.apiBaseUrl = environment.apiBaseUrl;
                }
                if (config.googleAnalyticsId == null && environment.googleAnalyticsId != null) {
                    config.googleAnalyticsId = environment.googleAnalyticsId;
                }

                this._configData = config;
            })
            .catch((err: any) => Promise.resolve());
    }

    get configData(): Config {
        return this._configData;
    }

    set configData(configData: Config) {
        this._configData = configData;
    }
}
