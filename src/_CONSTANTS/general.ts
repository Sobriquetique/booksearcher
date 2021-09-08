import CONFIG from "src/config.json";

export const MOBILE_WIDTH_BREAKPOINT = 1080;

/** ~30 fps limit */
export const RESIZE_THROTTLE_INTERVAL = 1000 / 15;

/** Дефолтная пагинация для превью книг */
export const DEFAULT_MAX_RESULTS = 30;

export const PAGE_FADE_TIMEOUT = 400;

export const basePreviewsUrl = CONFIG.BASE_PREVIEWS_URL;
export const baseBookUrl = CONFIG.BASE_BOOK_URL;