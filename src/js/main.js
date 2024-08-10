const elements = {
    mainTop: document.querySelector(".main__top"),
    tabs: document.querySelector(".main__tabs"),
    loading: document.querySelector(".main__loading"),
    error: document.querySelector(".main__error"),
    code: document.querySelector(".main__code"),
    company: document.querySelector(".main__company"),
    disclaimer: document.querySelector(".main__disclaimer"),
}

const DATA_URL = "https://raw.githubusercontent.com/lucianoayres/random-stock-of-the-day-json/main/b3-ticker.json"

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
        setDisplay(elements.loading, "block")
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
        setDisplay(elements.loading, "none")
        setDisplay(elements.error, "flex")
        setVisibility(elements.mainTop, "hidden")
    },
}

const fetchData = async () => {
    try {
        const response = await fetch(DATA_URL)
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        const { ticker: code, name: company } = data

        if (!code || !company) {
            throw new Error("Invalid data: code or company is missing")
        }

        updateText(elements.code, code)
        updateText(elements.company, company)
        //states.showData()
    } catch (error) {
        console.error("Error fetching data:", error)
        states.error()
    }
}

const init = () => {
    states.loading()
    fetchData()
}

init()
