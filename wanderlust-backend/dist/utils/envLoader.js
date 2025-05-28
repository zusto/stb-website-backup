import * as fs from 'fs';
import * as dotenv from 'dotenv';
export function reloadEnv() {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}
