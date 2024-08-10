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

const STOCK_DATA_URL = "https://raw.githubusercontent.com/lucianoayres/random-stock-of-the-day-json/main/b3-last-picks.json"
const ACTIVE_TAB_CLASSNAME = "main__tab--active"

const setVisibility = (element, visibility) => {
    if (element) element.style.visibility = visibility
}

const setDisplay = (element, display) => {
    if (element) element.style.display = display
}

const updateText = (element, text) => {
    if (element) element.textContent = text
}

const states = {
    loading: () => {
        setVisibility(elements.loading, "visible")
        setVisibility(elements.mainTop, "hidden")
        setVisibility(elements.tabs, "hidden")
        setVisibility(elements.code, "hidden")
        setVisibility(elements.company, "hidden")
        setVisibility(elements.disclaimer, "hidden")
        setDisplay(elements.error, "none")
    },
    showData: () => {
        setDisplay(elements.loading, "none")
        setVisibility(elements.mainTop, "visible")
        setVisibility(elements.tabs, "visible")
        setVisibility(elements.code, "visible")
        setVisibility(elements.company, "visible")
        setVisibility(elements.disclaimer, "visible")
        setDisplay(elements.error, "none")
    },
    error: () => {
        setVisibility(elements.loading, "hidden")
        setDisplay(elements.error, "flex")
        setVisibility(elements.mainTop, "hidden")
    },
}

const fetchData = async (index = -1) => {
    try {
        const response = await fetch(STOCK_DATA_URL)
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        console.log(data)
        if (data.length === 0) throw new Error("No data available")

        // Hide the "Yesterday" tab if there's only one item
        if (data.length === 1) {
            setDisplay(elements.yesterdayTab, "none")
        } else {
            setDisplay(elements.yesterdayTab, "block")
        }

        const selectedItem = index === -1 ? data[data.length - 1] : data[data.length - 2]
        const { ticker: code, name: company } = selectedItem

        if (!code || !company) throw new Error("Invalid data: code or company is missing")

        updateText(elements.code, code)
        updateText(elements.company, company)
        states.showData()
    } catch (error) {
        console.error("Error fetching data:", error)
        states.error()
    }
}

function switchTab(activeTab, inactiveTab, index) {
    activeTab.classList.add(ACTIVE_TAB_CLASSNAME)
    inactiveTab.classList.remove(ACTIVE_TAB_CLASSNAME)
    states.loading()
    fetchData(index)
}

elements.todayTab.addEventListener("click", () => switchTab(elements.todayTab, elements.yesterdayTab, -1))
elements.yesterdayTab.addEventListener("click", () => switchTab(elements.yesterdayTab, elements.todayTab, -2))

const init = () => {
    states.loading()
    fetchData() // Load the last item (today's data) by default
}

init()
