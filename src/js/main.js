// Cache DOM elements
const elements = {
    mainTop: document.querySelector(".main__top"),
    tabs: document.querySelector(".main__tabs"),
    loading: document.querySelector(".main__loading"),
    error: document.querySelector(".main__error"),
    code: document.querySelector(".main__code"),
    company: document.querySelector(".main__company"),
    disclaimer: document.querySelector(".main__disclaimer"),
    todayTab: document.getElementById("today-tab"),
    yesterdayTab: document.getElementById("yesterday-tab"),
}

// Constants
const STOCK_DATA_URL = "https://raw.githubusercontent.com/lucianoayres/random-stock-of-the-day-json/main/b3-last-picks.json"
const ACTIVE_TAB_CLASSNAME = "main__tab--active"
const DISABLED_TAB_CLASSNAME = "main__tab--disabled"

const TODAY_TAB_TITLE = "View Today's Stock Ticker"
const YESTERDAY_TAB_TITLE = "View Yesterday's Stock Ticker"
const YESTERDAY_TAB_NO_DATA_TITLE = "No stock data for yesterday"

elements.todayTab.setAttribute("title", TODAY_TAB_TITLE)
elements.yesterdayTab.setAttribute("title", YESTERDAY_TAB_TITLE)

// Utility functions
const setElementVisibility = (element, visibility) => {
    if (element) element.style.visibility = visibility
}

const setElementDisplay = (element, display) => {
    if (element) element.style.display = display
}

const updateElementText = (element, text) => {
    if (element) element.textContent = text.toUpperCase()
}

const toggleTabState = (tab, disable) => {
    if (disable) {
        tab.classList.add(DISABLED_TAB_CLASSNAME)
        tab.setAttribute("title", YESTERDAY_TAB_TITLE)
        tab.setAttribute("aria-disabled", "true")
    } else {
        tab.classList.remove(DISABLED_TAB_CLASSNAME)
        tab.setAttribute("title", YESTERDAY_TAB_TITLE)
        tab.removeAttribute("aria-disabled")
    }
}

// State functions
const showLoadingState = () => {
    setElementVisibility(elements.loading, "visible")
    setElementVisibility(elements.mainTop, "hidden")
    setElementVisibility(elements.tabs, "hidden")
    setElementVisibility(elements.code, "hidden")
    setElementVisibility(elements.company, "hidden")
    setElementVisibility(elements.disclaimer, "hidden")
    setElementDisplay(elements.error, "none")
}

const showDataState = () => {
    setElementDisplay(elements.loading, "none")
    setElementVisibility(elements.mainTop, "visible")
    setElementVisibility(elements.tabs, "visible")
    setElementVisibility(elements.code, "visible")
    setElementVisibility(elements.company, "visible")
    setElementVisibility(elements.disclaimer, "visible")
    setElementDisplay(elements.error, "none")
}

const showErrorState = () => {
    setElementVisibility(elements.loading, "hidden")
    setElementDisplay(elements.error, "flex")
    setElementVisibility(elements.mainTop, "hidden")
}

// Data fetching function
const fetchData = async (index = -1) => {
    try {
        const response = await fetch(STOCK_DATA_URL)
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        if (data.length === 0) throw new Error("No data available")

        toggleTabState(elements.yesterdayTab, data.length === 1)

        const selectedItem = index === -1 ? data[data.length - 1] : data[data.length - 2]
        const { ticker: code, name: company } = selectedItem

        if (!code || !company) throw new Error("Invalid data: code or company is missing")

        updateElementText(elements.code, code)
        updateElementText(elements.company, company)
        showDataState()
    } catch (error) {
        console.error("Error fetching data:", error)
        showErrorState()
    }
}

// Tab switching function
const switchTab = (activeTab, inactiveTab, index) => {
    activeTab.classList.add(ACTIVE_TAB_CLASSNAME)
    inactiveTab.classList.remove(ACTIVE_TAB_CLASSNAME)
    showLoadingState()
    fetchData(index)
}

// Event listeners
elements.todayTab.addEventListener("click", () => switchTab(elements.todayTab, elements.yesterdayTab, -1))
elements.yesterdayTab.addEventListener("click", () => {
    if (!elements.yesterdayTab.classList.contains(DISABLED_TAB_CLASSNAME)) {
        switchTab(elements.yesterdayTab, elements.todayTab, -2)
    }
})

// Initialization
const init = () => {
    showLoadingState()
    fetchData() // Load the last item (today's data) by default
}

init()
