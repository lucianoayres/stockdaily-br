import { ELEMENTS } from "./elements.js"
import { setElementVisibility, setElementDisplay } from "./utils.js"

export const showLoadingState = () => {
    setElementVisibility(ELEMENTS.loading, "visible")
    setElementVisibility(ELEMENTS.mainTop, "hidden")
    setElementVisibility(ELEMENTS.tabs, "hidden")
    setElementVisibility(ELEMENTS.code, "hidden")
    setElementVisibility(ELEMENTS.company, "hidden")
    setElementVisibility(ELEMENTS.disclaimer, "hidden")
    setElementDisplay(ELEMENTS.error, "none")
}

export const showDataState = () => {
    setElementDisplay(ELEMENTS.loading, "none")
    setElementVisibility(ELEMENTS.mainTop, "visible")
    setElementVisibility(ELEMENTS.tabs, "visible")
    setElementVisibility(ELEMENTS.code, "visible")
    setElementVisibility(ELEMENTS.company, "visible")
    setElementVisibility(ELEMENTS.disclaimer, "visible")
    setElementDisplay(ELEMENTS.error, "none")
}

export const showErrorState = () => {
    setElementVisibility(ELEMENTS.loading, "hidden")
    setElementDisplay(ELEMENTS.error, "flex")
    setElementVisibility(ELEMENTS.mainTop, "hidden")
}
