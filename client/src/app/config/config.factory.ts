import { ConfigService } from './config.service';

// tslint:disable-next-line:ban-types
export function configServiceFactory(startupService: ConfigService): Function {
    return () => startupService.load();
}
