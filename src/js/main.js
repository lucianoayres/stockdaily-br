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
    randomTab: document.getElementById("random-tab"),
    tryAgainButton: document.getElementById("reload-button"),
}

// Constants
const STOCK_DATA_URL = "https://raw.githubusercontent.com/lucianoayres/random-stock-of-the-day-json/main/b3-last-picks.json"
const RANDOM_DATA_URL = "https://raw.githubusercontent.com/lucianoayres/brazil-stocks-tickers-json/main/b3_stocks_tickers.json" // Separate URL for random data
const ACTIVE_TAB_CLASSNAME = "main__tab--active"
const DISABLED_TAB_CLASSNAME = "main__tab--disabled"

const TODAY_TAB_TITLE = "View Today's Stock Ticker"
const YESTERDAY_TAB_TITLE = "View Yesterday's Stock Ticker"
const RANDOM_TAB_TITLE = "View a Random Stock Ticker"
const YESTERDAY_TAB_NO_DATA_TITLE = "No stock data for yesterday"

elements.todayTab.setAttribute("title", TODAY_TAB_TITLE)
elements.yesterdayTab.setAttribute("title", YESTERDAY_TAB_TITLE)
elements.randomTab.setAttribute("title", RANDOM_TAB_TITLE)

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

// Random item picker
const getRandomItem = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
}

// Data fetching function
const fetchData = async ({ url, mode } = {}) => {
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        if (data.length === 0) throw new Error("No data available")

        toggleTabState(elements.yesterdayTab, data.length === 1)

        const modeActions = {
            today: () => data[data.length - 1],
            yesterday: () => (data.length > 1 ? data[data.length - 2] : null),
            random: () => getRandomItem(data),
        }

        const selectedItem = modeActions[mode]()
        if (!selectedItem || !selectedItem.ticker || !selectedItem.name) {
            throw new Error("Invalid data: code or company is missing")
        }

        updateElementText(elements.code, selectedItem.ticker)
        updateElementText(elements.company, selectedItem.name)
        showDataState()
    } catch (error) {
        console.error("Error fetching data:", error)
        showErrorState()
    }
}

// Tab switching function
const switchTab = (activeTab, inactiveTabs, mode, url) => {
    activeTab.classList.add(ACTIVE_TAB_CLASSNAME)
    inactiveTabs.forEach((tab) => tab.classList.remove(ACTIVE_TAB_CLASSNAME))
    showLoadingState()
    fetchData({ mode, url })
}

// Event listeners
elements.todayTab.addEventListener("click", () => switchTab(elements.todayTab, [elements.yesterdayTab, elements.randomTab], "today", STOCK_DATA_URL))
elements.yesterdayTab.addEventListener("click", () => {
    if (!elements.yesterdayTab.classList.contains(DISABLED_TAB_CLASSNAME)) {
        switchTab(elements.yesterdayTab, [elements.todayTab, elements.randomTab], "yesterday", STOCK_DATA_URL)
    }
})
elements.randomTab.addEventListener("click", () => switchTab(elements.randomTab, [elements.todayTab, elements.yesterdayTab], "random", RANDOM_DATA_URL)) // Updated event listener for randomTab

elements.tryAgainButton.addEventListener("click", () => location.reload())

// Initialization
const init = () => {
    showLoadingState()
    fetchData({ mode: "today", url: STOCK_DATA_URL }) // Load the last item (today's data) by default
}

init()
