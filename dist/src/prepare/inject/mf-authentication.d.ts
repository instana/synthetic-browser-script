import { ThenableWebDriver } from "selenium-webdriver";
import { PrepareOption } from "../prepare-base";
/**
 * @param {string} [digits=6]
 * @param {string} [algorithm="SHA-1"]
 * @param {string} [period=30]
 * @param {string} [timestamp=Date.now()]
 */
export type TOTPOptions = {
    digits?: number;
    algorithm?: "SHA-1" | "SHA-224" | "SHA-256" | "SHA-384" | "SHA-512" | "SHA3-224" | "SHA3-256" | "SHA3-384" | "SHA3-512";
    period?: number;
    timestamp?: number;
};
export declare class MFAuthentication {
    webDriver: ThenableWebDriver;
    option: PrepareOption;
    pendingPromises: PromiseLike<any>[];
    constructor(webDriver: ThenableWebDriver, option: PrepareOption);
    /**
     * Generate TOTP tokens from a TOTP key.
     * It needs to be generated in runtime when you need to input it.
     *
     * The default token settings are:
     * - SHA-1
     * - 30-second epoch interval
     * - 6-digit tokens
     *
     * Settings can be provided as an optional second parameter inside an object.
     * @param {string} key  A TOTP key. Keys provided must be base32 strings
     * @param {TOTPOptions} options  Optional Settings e.g. {digits: 8, algorithm: "SHA-512", period: 60}
     * @returns {string} A Time-based One-time Password (TOTP) token
     */
    generate2FAToken: (key: string, options?: TOTPOptions) => string;
}
