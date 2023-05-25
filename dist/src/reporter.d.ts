import { Har } from "har-format";
import { ThenableWebDriver } from "selenium-webdriver";
import { Command } from "selenium-webdriver/lib/command";
import { HisEntry, HisHarHelper } from "./common/his-entry";
import { MediaChunk } from "./bhelper/collect-media";
import { JestEvent } from "./sandbox-scripts/host-jest/event";
import { SecretRedactor } from "./common/strip-secrets";
export declare enum ReportMethod {
    Dump = 0,
    File = 1,
    Rest = 2,
    Callback = 3
}
export declare class PostCommandReporter {
    recieverOnPostCommand: (cmd: Command, res: any) => Promise<void>;
    onPostCommand: (cmd: Command, res: any) => Promise<void>;
}
export declare type PlaybackEventMap = {
    name: "jest_event";
    param: JestEvent;
} | {
    name: "max";
    param: any;
};
export interface ReporterCallback {
    onHarfile(harContent: string, isLast: boolean): void;
    onVideoChunks(chunks: MediaChunk[], isLast: boolean): void;
    onEvent(data: PlaybackEventMap): void;
    onInsights(insights: Map<string, any>, isLast: boolean): void;
    onScreenshot(image: string, param: string): void;
    onException(err: Error): boolean;
    onClose(code: number): void;
}
export declare class Reporter {
    webdriver: ThenableWebDriver;
    hisHarHelper: HisHarHelper;
    ticker: number;
    tickerException: number;
    lastVideoChunkCsid: string;
    postCmd: PostCommandReporter;
    reportMethod: ReportMethod;
    reportParam: string;
    onReport: ReporterCallback;
    constructor(webdriver: ThenableWebDriver, postCmd: PostCommandReporter, reportdir: string, reportMethod: string, onReport?: ReporterCallback);
    onEvent: (name: string, param: any) => void;
    onScreenshot: (image: string, param: string) => Promise<void>;
    onPostCommand: (cmd: Command, res: any) => Promise<void>;
    reportInsights(insights: Map<string, any>, isLast: boolean): Promise<void>;
    reportVideoChunks(videoChunks: MediaChunk[], isLast: boolean): Promise<void>;
    reportException(err: Error): void;
    writeMetadata(): Promise<void>;
    reportBrowserLogByWebDriver(): Promise<void>;
    reportHar(data: HisEntry[] | Har, isLast: boolean, secrets: SecretRedactor): Promise<void>;
}
