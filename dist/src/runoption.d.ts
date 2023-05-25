import { ProxyOption } from "./prepare/prepare-base";
import { ReporterCallback } from "./reporter";
export declare class XvfbOption {
    noxvfb?: boolean;
}
export declare class IntegrationOption {
    type: 'jest' | 'cucumber' | 'side' | 'none';
    args: (string | number)[];
}
export declare class ScriptRunnerOption {
    script: string;
    secure?: any;
    scriptPath?: string;
    verbose?: number;
    browserType?: 'firefox' | 'chrome';
    integration?: IntegrationOption;
    headless?: boolean;
    enableRecording?: boolean;
    markSyntheticCall?: boolean;
    proxy?: ProxyOption;
    xvfb?: XvfbOption;
    nologTimestamp?: boolean;
    nohideAutomation?: boolean;
    delayCollector?: boolean;
    winsize?: string;
    forcesandbox?: boolean;
    nolowcarbon?: boolean;
    onReport?: ReporterCallback;
    onLog?(msg: string): boolean;
}
