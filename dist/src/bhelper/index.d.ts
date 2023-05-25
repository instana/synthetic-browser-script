import { ThenableWebDriver } from "selenium-webdriver";
export declare class BrowserHelper {
    browserType: string;
    headless: boolean;
    webdriver: ThenableWebDriver;
    constructor(browserType: string, headless: boolean, webdriver: ThenableWebDriver);
    flushHar(): Promise<import("../common/his-entry").HisEntry[]> | Promise<import("har-format").Har>;
    rotateHar(): Promise<import("../common/his-entry").HisEntry[]> | Promise<import("har-format").Har>;
    rotateMedia(): Promise<import("./collect-media").MediaChunk[]>;
    flushMedia(): Promise<import("./collect-media").MediaChunk[]>;
}
