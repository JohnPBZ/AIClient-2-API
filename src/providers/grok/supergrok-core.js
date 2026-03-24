import { GrokApiService } from './grok-core.js';

export class SuperGrokApiService extends GrokApiService {
    constructor(config) {
        const mergedConfig = {
            ...config,
            GROK_COOKIE_TOKEN: config.GROK_COOKIE_TOKEN || config.SUPERGROK_COOKIE_TOKEN,
            GROK_CF_CLEARANCE: config.GROK_CF_CLEARANCE || config.SUPERGROK_CF_CLEARANCE,
            GROK_USER_AGENT: config.GROK_USER_AGENT || config.SUPERGROK_USER_AGENT,
            GROK_BASE_URL: config.GROK_BASE_URL || config.SUPERGROK_BASE_URL,
        };
        super(mergedConfig);
    }
}
