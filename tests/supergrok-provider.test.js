import fs from 'fs';
import path from 'path';
import { MODEL_PROTOCOL_PREFIX, MODEL_PROVIDER } from '../src/utils/common.js';
import { getProviderModels } from '../src/providers/provider-models.js';
import { ConverterFactory } from '../src/converters/ConverterFactory.js';
import '../src/converters/register-converters.js';

describe('SuperGrok provider integration', () => {
    test('registers SuperGrok provider constants', () => {
        expect(MODEL_PROTOCOL_PREFIX.SUPERGROK).toBe('supergrok');
        expect(MODEL_PROVIDER.SUPERGROK_CUSTOM).toBe('supergrok-custom');
    });

    test('registers SuperGrok model list and converter', () => {
        const models = getProviderModels('supergrok-custom');
        expect(models).toContain('grok-4.20-beta');
        expect(models).toContain('grok-4.20-fast');

        const converter = ConverterFactory.getConverter('supergrok');
        expect(converter).toBeTruthy();
        expect(typeof converter.convertRequest).toBe('function');
    });

    test('wires SuperGrok adapter registration and core alias', () => {
        const adapterPath = path.join(process.cwd(), 'src/providers/adapter.js');
        const superGrokCorePath = path.join(process.cwd(), 'src/providers/grok/supergrok-core.js');
        const adapterContent = fs.readFileSync(adapterPath, 'utf8');
        const superGrokCoreContent = fs.readFileSync(superGrokCorePath, 'utf8');

        expect(adapterContent).toContain('registerAdapter(MODEL_PROVIDER.SUPERGROK_CUSTOM, SuperGrokApiServiceAdapter);');
        expect(superGrokCoreContent).toContain('export class SuperGrokApiService extends GrokApiService');
    });
});
