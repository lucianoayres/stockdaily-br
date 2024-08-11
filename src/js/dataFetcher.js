import { ELEMENTS, YESTERDAY_TAB_TITLE, YESTERDAY_TAB_NO_DATA_TITLE } from "./elements.js"
import { updateElementText, toggleTabState, getRandomItem } from "./utils.js"
import { showDataState, showErrorState } from "./states.js"

const { yesterdayTab, code, company } = ELEMENTS

export const fetchData = async ({ url, mode } = {}) => {
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("Network response was not ok")

        const data = await response.json()
        if (data.length === 0) throw new Error("No data available")

        toggleTabState(yesterdayTab, data.length === 1, YESTERDAY_TAB_TITLE, YESTERDAY_TAB_NO_DATA_TITLE)

        const modeActions = {
            today: () => data[data.length - 1],
            yesterday: () => (data.length > 1 ? data[data.length - 2] : null),
            random: () => getRandomItem(data),
        }

        const selectedItem = modeActions[mode]()
        if (!selectedItem || !selectedItem.ticker || !selectedItem.name) {
            throw new Error("Invalid data: code or company is missing")
        }

        updateElementText(code, selectedItem.ticker)
        updateElementText(company, selectedItem.name)
        showDataState()
    } catch (error) {
        console.error("Error fetching data:", error)
        showErrorState()
    }
}
