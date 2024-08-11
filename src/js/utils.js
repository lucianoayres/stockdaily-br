export const setElementVisibility = (element, visibility) => {
    if (element) element.style.visibility = visibility
}

export const setElementDisplay = (element, display) => {
    if (element) element.style.display = display
}

export const updateElementText = (element, text) => {
    if (element) element.textContent = text.toUpperCase()
}

export const toggleTabState = (tab, disable, title, disabledTitle, disabledClassName) => {
    if (disable) {
        tab.classList.add(disabledClassName)
        tab.setAttribute("title", disabledTitle)
        tab.setAttribute("aria-disabled", "true")
    } else {
        tab.classList.remove(disabledClassName)
        tab.setAttribute("title", title)
        tab.removeAttribute("aria-disabled")
    }
}

export const getRandomItem = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
}
