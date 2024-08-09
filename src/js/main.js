console.log("hello world")

const mainTop = document.querySelector(".main__top")
const tabs = document.querySelector(".main__tabs")

const loading = document.querySelector(".main__loading")

const error = document.querySelector(".main__error")

const code = document.querySelector(".main__code")
const company = document.querySelector(".main__company")
const disclaimer = document.querySelector(".main__disclaimer")

// loading state hidden
loading.style.display = "none"

// error state hidden
// error.style.display = "none"
mainTop.style.visibility = "hidden"

// loaded state hidden
tabs.style.visibility = "hidden"
code.style.visibility = "hidden"
company.style.visibility = "hidden"
disclaimer.style.visibility = "hidden"
