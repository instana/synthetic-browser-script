import { Har } from "har-format";
import { ThenableWebDriver } from "selenium-webdriver";
import { HisEntry } from "../common/his-entry";
export declare function collectLogging(browserType: string, headless: boolean, webdriver: ThenableWebDriver, flush: boolean): Promise<HisEntry[]> | Promise<Har>;
