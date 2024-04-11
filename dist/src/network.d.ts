/// <reference types="node" />
import { ThenableWebDriver } from "selenium-webdriver";
import { URL } from "url";
export declare enum FFProxyType {
    NONE = "none",
    AUTODETECT = "autoDetect",
    SYSTEM = "system",
    MANUAL = "manual",
    AUTOCONFIG = "autoConfig"
}
/**
* Firefox extension - An object encapsulating a complete proxy configuration
* @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/proxy/settings
*/
export interface FFProxyConfig {
    proxyType?: FFProxyType;
    http?: string;
    ssl?: string;
    ftp?: string;
    autoConfigUrl?: string;
    autoLogin?: boolean;
    httpProxyAll?: boolean;
    passthrough?: string;
    proxyDNS?: boolean;
    socks?: string;
    socksVersion?: number;
}
export declare enum CProxyType {
    NONE = "direct",
    AUTODETECT = "auto_detect",
    SYSTEM = "system",
    MANUAL = "fixed_servers",
    AUTOCONFIG = "pac_script"
}
export declare enum Scheme {
    HTTP = "http",
    HTTPS = "https",
    QUIC = "quic",
    SOCKS4 = "socks4",
    SOCKS5 = "socks5"
}
/**
* Chrome extension - An object encapsulating a single proxy server's specification
* @see https://developer.chrome.com/docs/extensions/reference/proxy/#type-ProxyServer
*/
export interface ProxyServer {
    host: string;
    port?: number;
    scheme?: Scheme;
}
/**
* Chrome extension - An object encapsulating a complete proxy configuration
* @see https://developer.chrome.com/docs/extensions/reference/proxy/#type-ProxyConfig
*/
export interface CProxyConfig {
    mode: CProxyType;
    rules?: {
        bypassList?: string[];
        fallbackProxy?: ProxyServer;
        proxyForFtp?: ProxyServer;
        proxyForHttp?: ProxyServer;
        proxyForHttps?: ProxyServer;
        singleProxy?: ProxyServer;
    };
    pacScript?: {
        data?: string;
        mandatory?: boolean;
        url?: string;
    };
}
export declare class Network {
    private webDriver;
    constructor(webDriver: ThenableWebDriver);
    /**
     * Manually configures the browser proxy.  The following options are
     * supported:
     * - `proxyURL`: Proxy host to use for FTP/HTTP/HTTPS requests
     * - `noProxy`: A list of hosts requests should directly connect to,
     *     bypassing any other proxies for that request.
     *
     * A `Error` is thrown if `proxyURL` can not be parsed.
     * @param {string | URL} proxyURL The proxy host, in format of
     *                 [_<scheme>_://_<username>_:_<password>_@]_<host>_[:_<port>_]
     *                 @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param {string} noProxy Optional, a comma-separated list of hosts
     * @returns {promise}
     */
    setProxy: (proxyURL: string | URL, noProxy?: string) => Promise<any>;
    /**
     * Automatically configures the browser proxy by using a PAC file.
     *
     * @param {string} pacScriptURL The URL of the PAC script
     * @param {string} noProxy Optional. a comma-separated list of hosts
     * @param {Map} authMap Optional. Map of authentication credentials
     * to be provided to the proxy server(s), keyed by the hostnames of the proxy server.
     * Values of this map must be defined in the format
     * {username: "authUsername", password: "authPassword"}
     * @returns {promise}
     */
    setProxyPAC: (pacScriptURL: string, noProxy?: string, authMap?: Map<string, any>) => Promise<any>;
    /**
     * Configures the browser proxy by using a complelet proxy configuration object for
     *   different type of browser
     *
     * @param {FFProxyConfig | CProxyConfig} proxyConfig
     * Browser config in browser specific encapsulation
     * @see https://developer.chrome.com/docs/extensions/reference/proxy/#type-ProxyConfig
     * for a complete proxy configuration encapsulating for Chrome
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/proxy/settings
     * for a complete proxy configuration encapsulating for Firefox
     * @param {string} authName Optional. Username of the proxy server for authentication.
     * @param {string} authPass Optional. User password of the proxy server for authentication.
     * @returns {promise}
     */
    setProxyAdvanced: (proxyConfig: FFProxyConfig | CProxyConfig, authName?: string, authPass?: string) => Promise<any>;
    /**
     * Clear the current proxy configuration
     * @returns {Promise}
     */
    clearProxy: () => Promise<any>;
    /**
     * Retrieve the current proxy configuration.
     * @returns {FFProxyConfig | CProxyConfig}
     */
    getProxy: () => FFProxyConfig | CProxyConfig;
    /**
     * Manually configures the browser proxy for all HTTP requests.  The following options are
     * supported:
     * - `proxyURL`: Proxy host to use for HTTP requests
     * - `noProxy`: A list of hosts requests should directly connect to,
     *     bypassing any other proxies for that request.
     *
     * A `Error` is thrown if `proxyURL` can not be parsed.
     * @param {string | URL} proxyURL The proxy host, in format of
     *                 [_<scheme>_://_<username>_:_<password>_@]_<host>_[:_<port>_]
     *                 @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param {string} noProxy Optional, a comma-separated list of hosts
     * @returns {promise}
     */
    setProxyForHttp: (proxyURL: string | URL, noProxy?: string) => Promise<any>;
    /**
     * Manually configures the browser proxy for all HTTPS requests.  The following options are
     * supported:
     * - `proxyURL`: Proxy host to use for HTTPS requests
     * - `noProxy`: A list of hosts requests should directly connect to,
     *     bypassing any other proxies for that request.
     *
     * A `Error` is thrown if `proxyURL` can not be parsed.
     * @param {string | URL} proxyURL The proxy host, in format of
     *                 [_<scheme>_://_<username>_:_<password>_@]_<host>_[:_<port>_]
     *                 @see https://nodejs.org/api/url.html#url_url_strings_and_url_objects
     * @param {string} noProxy Optional, a comma-separated list of hosts
     * @returns {promise}
     */
    setProxyForHttps: (proxyURL: string | URL, noProxy?: string) => Promise<any>;
}
