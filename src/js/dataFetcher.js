import { ELEMENTS, YESTERDAY_TAB_TITLE, YESTERDAY_TAB_NO_DATA_TITLE, DISABLED_TAB_CLASSNAME } from "./elements.js"
import { updateElementText, toggleTabState, getRandomItem } from "./utils.js"
import { handleApiResponse } from "./apiUtils.js"
import { showDataState, showErrorState } from "./states.js"

const { yesterdayTab, code, company } = ELEMENTS

// Function to handle data processing based on mode
const processDataByMode = (data, mode) => {
    const modeActions = {
        today: () => data[data.length - 1],
        yesterday: () => (data.length > 1 ? data[data.length - 2] : null),
        random: () => getRandomItem(data),
    }
    return modeActions[mode]()
}

// Function to validate selected item
const validateSelectedItem = (item) => {
    if (!item || !item.ticker || !item.name) {
        throw new Error("Invalid data: code or company is missing")
    }
}

export const fetchData = async ({ url, mode } = {}) => {
    try {
        const response = await fetch(url)
        const data = await handleApiResponse(response)

        toggleTabState(yesterdayTab, data.length === 1, YESTERDAY_TAB_TITLE, YESTERDAY_TAB_NO_DATA_TITLE, DISABLED_TAB_CLASSNAME)

        const selectedItem = processDataByMode(data, mode)
        validateSelectedItem(selectedItem)

        updateElementText(code, selectedItem.ticker)
        updateElementText(company, selectedItem.name)
        showDataState()
    } catch (error) {
        console.error("Error fetching data:", error)
        showErrorState()
    }
}
