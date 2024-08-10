const elements = {
    mainTop: document.querySelector(".main__top"),
    tabs: document.querySelector(".main__tabs"),
    loading: document.querySelector(".main__loading"),
    error: document.querySelector(".main__error"),
    code: document.querySelector(".main__code"),
    company: document.querySelector(".main__company"),
    disclaimer: document.querySelector(".main__disclaimer"),
}

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
        setVisibility(elements.mainTop, "visible")
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

const loadData = () => {
    updateText(elements.code, "PETR")
    updateText(elements.company, "PETROBRAS")
    console.log("Load data invoked")
    states.showData() // Show the loaded data state
}

const init = () => {
    states.loading() // Start with the loading state

    try {
        loadData() // Attempt to load data
    } catch (error) {
        console.error("Error loading data:", error)
        states.error() // Switch to error state on failure
    }
}

init()
