import { Entry, Page, RumMetrics, Har } from "har-format";
export type HisEntry = {
    sender: string;
    type: string;
    url: string;
    value: string;
    rid?: string;
};
export type BrowserInfo = {
    name: string;
    version: string;
    platform: string;
    userAgent: string;
    session: string;
};
export declare enum HisEntryType {
    OnRequestFinished = "OnRequestFinished",
    OnNavigated = "OnNavigated",
    BeforeUnLoad = "BeforeUnLoad",
    Unload = "Unload",
    DOMContentLoaded = "DOMContentLoaded",
    Load = "Load",
    CLS = "CLS",
    FID = "FID",
    LCP = "LCP",
    FCP = "FCP",
    TTFB = "TTFB",
    Other = "Other"
}
export type HisValueType = HisValueLoad | Entry | string;
export type HisValueLoad = {
    timing: PerformanceTiming;
    title?: string;
};
export declare class PasedHisEntry {
    sender: string;
    type: HisEntryType;
    url: string;
    value: HisValueType;
    toString: () => string;
}
export declare enum ResourceType {
    Document = "document",
    StyleSheet = "stylesheet",
    Image = "image",
    Font = "font",
    Script = "script",
    XHR = "xhr",
    Fetch = "fetch",
    Ping = "ping",
    Beacon = "beacon",
    WebSocket = "websocket",
    EventSource = "eventsource",
    Media = "media",
    Other = "other"
}
export declare const resourceTypeByExtension: Map<string, ResourceType>;
export declare function fromMimeType(mimeType: string | null): ResourceType;
export declare function fromURL(url: string): ResourceType | null;
export declare function fromCustomizedResourceType(_resourceType: string): ResourceType | null;
export declare function resolveHAREntryResourceType(entry: Entry): ResourceType;
export declare class HisHarHelper {
    private pageNumber;
    private lastRID;
    private lastPageRefFromBrowser;
    private readonly TRIM_URL_END_RE;
    parsedHisEntries: PasedHisEntry[];
    private harLog;
    private pageMap;
    private urlPageMap;
    trimURL(url: String): string;
    enrich(binfo: BrowserInfo): void;
    generate(): Har;
    makePage: (pageref: string, parsedValue: Entry) => Page;
    enrichPage: (page: Page, pageref: string, parsedValue: Entry) => Page;
    makeEmptyPage: (url: string) => Page;
    mutatePage: (entry: HisEntry, callback: (curr: Page) => void) => void;
    mutatePageRUM: (entry: HisEntry, callback: (rum: RumMetrics) => void) => void;
    add(hisEntries: HisEntry[]): void;
}
