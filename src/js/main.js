const mainTop = document.querySelector(".main__top")
const tabs = document.querySelector(".main__tabs")

const loading = document.querySelector(".main__loading")

const error = document.querySelector(".main__error")

const code = document.querySelector(".main__code")
const company = document.querySelector(".main__company")
const disclaimer = document.querySelector(".main__disclaimer")

function hideLoadedState() {
    // loaded state hidden
    tabs.style.visibility = "hidden"
    code.style.visibility = "hidden"
    company.style.visibility = "hidden"
    disclaimer.style.visibility = "hidden"
}

function hideLoadingState() {
    // loading state hidden
    loading.style.display = "none"
}

function hideErrorState() {
    // error state hidden
    error.style.display = "none"
}

function showLoadedState() {
    // loaded state hidden
    tabs.style.visibility = "visible"
    code.style.visibility = "visible"
    company.style.visibility = "visible"
    disclaimer.style.visibility = "visible"
}

function showLoadingState() {
    // loading state hidden
    loading.style.display = "block"
}

function showErrorState() {
    // error state hidden
    error.style.display = "block"
    mainTop.style.visibility = "hidden"
}

function loadData() {
    // Load data code (TBD)
    console.log("Load data invoked")
}

function init() {
    hideErrorState()
    hideLoadedState()

    loadData()
    // if success:
    // hideLoadingState()
    // showLoadedState()
    // else
    // hideLoadingState()
    // showErrorState()
}

init()
