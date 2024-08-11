// URL Configurations
const stockDataConfig = {
    baseUrl: "https://raw.githubusercontent.com/",
    repositoryName: "lucianoayres/random-stock-of-the-day-json/main/",
    fileName: "b3-last-picks.json",
}

const randomDataConfig = {
    baseUrl: "https://raw.githubusercontent.com/",
    repositoryName: "lucianoayres/brazil-stocks-tickers-json/main/",
    fileName: "b3_stocks_tickers.json",
}

// Constructed URLs
export const STOCK_DATA_URL = `${stockDataConfig.baseUrl}${stockDataConfig.repositoryName}${stockDataConfig.fileName}`
export const RANDOM_DATA_URL = `${randomDataConfig.baseUrl}${randomDataConfig.repositoryName}${randomDataConfig.fileName}`
