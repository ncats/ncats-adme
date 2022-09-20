// this is a hack to access deploy-url taken from:
// tslint:disable-next-line:comment-format
// https://stackoverflow.com/questions/47885451/angular-cli-build-using-base-href-and-deploy-url-to-access-assets-on-cdn
// while this issues is still outstanding:
// https://github.com/angular/angular-cli/issues/6666

import { InjectionToken } from '@angular/core';

export const DEPLOY_URL = new InjectionToken<string>('deployUrl');
