import { ThenableWebDriver } from "selenium-webdriver";
export declare type MediaChunk = {
    sender: string;
    type: string;
    url: string;
    value: {
        buffer: string;
        timestamp: number | string;
        timecode: number | string;
        csid: string;
        order: number;
    };
    wid: string;
};
export declare function collectMediaChunks(browserType: string, headless: boolean, webdriver: ThenableWebDriver, flush: boolean): Promise<MediaChunk[]>;
