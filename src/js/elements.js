export const ELEMENTS = {
    mainTop: document.querySelector(".main__top"),
    tabs: document.querySelector(".main__tabs"),
    loading: document.querySelector(".main__loading"),
    error: document.querySelector(".main__error"),
    code: document.querySelector(".main__code"),
    company: document.querySelector(".main__company"),
    disclaimer: document.querySelector(".main__disclaimer"),
    todayTab: document.getElementById("today-tab"),
    yesterdayTab: document.getElementById("yesterday-tab"),
    randomTab: document.getElementById("random-tab"),
    tryAgainButton: document.getElementById("reload-button"),
}

export const ACTIVE_TAB_CLASSNAME = "main__tab--active"
export const DISABLED_TAB_CLASSNAME = "main__tab--disabled"

export const TODAY_TAB_TITLE = "View Today's Stock Ticker"
export const YESTERDAY_TAB_TITLE = "View Yesterday's Stock Ticker"
export const RANDOM_TAB_TITLE = "View a Random Stock Ticker"
export const YESTERDAY_TAB_NO_DATA_TITLE = "No stock data for yesterday"
