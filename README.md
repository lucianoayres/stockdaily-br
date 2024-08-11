# StockDaily-BR

A website that features a random stock ticker daily from the Brazil Stock Exhange (B3).

![StockDaily-BR Website Screenshot](https://github.com/user-attachments/assets/3da32d22-025e-47c5-b732-ae0404cc16a0)

_The website displays a random stock ticker of the day, yesterday's ticker, and a random item._

To explore the live website, visit: [https://lucianoayres.github.io/stockdaily-br/](https://lucianoayres.github.io/stockdaily-br/)

## Features

-   **Random Stock Ticker of the Day**: Displays a randomly selected stock ticker listed on B3.
-   **Yesterday's Stock Ticker**: Shows the stock ticker from yesterday.
-   **Random Item**: Provides a random item from the complete list.

## How It Works

-   **GitHub Action Workflow**: A GitHub Action workflow runs daily at 2:43 AM UTC to fetch a random stock ticker. This action ensures that a new ticker is displayed each day without repeating until all tickers from the dynamic list are shown. After all items have been displayed, the list starts over. The workflow configuration can be found in the repository: [random-stock-of-the-day-json](https://github.com/lucianoayres/random-stock-of-the-day-json).

-   **Python Utility Program**: The GitHub Action workflow utilizes a Python utility program named `rjip`. This program returns a random item from a JSON file passed as a parameter and keeps track of previously returned items to avoid repetition until all items are exhausted. You can find the `rjip` utility [here](https://github.com/lucianoayres/rjip).

## Deployment

The project is deployed as a static site on GitHub Pages, providing dynamic content every day through the running of the GitHub Action workflow. You can view the deployed website [here](https://lucianoayres.github.io/stockdaily-br/).

## Installation and Setup

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/lucianoayres/random-stock-of-the-day-web.git
    ```

2. Navigate to the project directory:

    ```bash
    cd random-stock-of-the-day-web
    ```

3. Open the `index.html` file in your browser to view the website.

## Contributing

Contributions to this project are welcome! Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/lucianoayres/stockdaily-br/blob/main/LICENSE) file for more details.

## Additional Information

-   The complete list of stock tickers can be found [here](https://github.com/lucianoayres/brazil-stocks-tickers-json).
