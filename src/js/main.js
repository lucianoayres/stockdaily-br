import { STOCK_DATA_URL, RANDOM_DATA_URL } from "./apiUrls.js"
import { ELEMENTS, ACTIVE_TAB_CLASSNAME, DISABLED_TAB_CLASSNAME, TODAY_TAB_TITLE, YESTERDAY_TAB_TITLE, RANDOM_TAB_TITLE } from "./elements.js"
import { showLoadingState } from "./states.js"
import { fetchData } from "./dataFetcher.js"

const { todayTab, yesterdayTab, randomTab, tryAgainButton } = ELEMENTS

todayTab.setAttribute("title", TODAY_TAB_TITLE)
yesterdayTab.setAttribute("title", YESTERDAY_TAB_TITLE)
randomTab.setAttribute("title", RANDOM_TAB_TITLE)

const switchTab = (activeTab, inactiveTabs, mode, url) => {
    activeTab.classList.add(ACTIVE_TAB_CLASSNAME)
    inactiveTabs.forEach((tab) => tab.classList.remove(ACTIVE_TAB_CLASSNAME))
    showLoadingState()
    fetchData({ mode, url })
}

export const initializeEvents = () => {
    todayTab.addEventListener("click", () => switchTab(todayTab, [yesterdayTab, randomTab], "today", STOCK_DATA_URL))
    yesterdayTab.addEventListener("click", () => {
        if (!yesterdayTab.classList.contains(DISABLED_TAB_CLASSNAME)) {
            switchTab(yesterdayTab, [todayTab, randomTab], "yesterday", STOCK_DATA_URL)
        }
    })
    randomTab.addEventListener("click", () => switchTab(randomTab, [todayTab, yesterdayTab], "random", RANDOM_DATA_URL))
    tryAgainButton.addEventListener("click", () => location.reload())
}

const init = () => {
    showLoadingState()
    fetchData({ mode: "today", url: STOCK_DATA_URL })
    initializeEvents()
}

init()
