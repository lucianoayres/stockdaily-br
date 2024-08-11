import { ELEMENTS } from "./elements.js"
import { setElementVisibility, setElementDisplay } from "./utils.js"

const { loading, mainTop, tabs, code, company, disclaimer, error } = ELEMENTS

export const showLoadingState = () => {
    setElementVisibility(loading, "visible")
    setElementVisibility(mainTop, "hidden")
    setElementVisibility(tabs, "hidden")
    setElementVisibility(code, "hidden")
    setElementVisibility(company, "hidden")
    setElementVisibility(disclaimer, "hidden")
    setElementDisplay(error, "none")
}

export const showDataState = () => {
    setElementDisplay(loading, "none")
    setElementVisibility(mainTop, "visible")
    setElementVisibility(tabs, "visible")
    setElementVisibility(code, "visible")
    setElementVisibility(company, "visible")
    setElementVisibility(disclaimer, "visible")
    setElementDisplay(error, "none")
}

export const showErrorState = () => {
    setElementVisibility(loading, "hidden")
    setElementDisplay(error, "flex")
    setElementVisibility(mainTop, "hidden")
}
