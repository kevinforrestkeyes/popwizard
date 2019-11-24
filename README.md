# project overview

popwizard is a supporting piece of a larger application [wjisk](https://github.com/kevinforrestkeyes/wjisk) - for taking product data that has been uploaded to [Depop](https://www.depop.com/) and transferring it to a store on [Shopify](https://shopify.com/). it can be tedious to try to maintain parity between the two platforms as there are no existing tools for moving data between them. i wanted to create a simple application to bridge the gap between these platforms and allow the user some control over how the products were being processed as they move from Depop to Shopify. this repository is only the part of this application, and is used to support other applications that i built specifically to facilitate this process. 

## this repository

popwizard is a Node/Express server that functions to scrape data from a given Depop store and serve it to the front-end of the application. Depop does not have a documented API that i was able to find so it was tricky to get the product data from the stores, but i found their internal api routes from monitoring their network requests as i viewed the store and was able to fetch some of the basic product data using those routes. for more detailed data about each product i would have crawl each product page individually, so i set up a serverless lambda function running Puppeteer ([popgoblin](https://github.com/kevinforrestkeyes/popgoblin)) to target specific product pages and scrape the missing data. this data is stored using MongoDB and made available via an API to the client.

(i don't believe any of this violates Depop's ToS, since i am just scraping data for a specific user who uploaded this same data originally themselves, but if you are reading this as a representative from Depop, yes i will move to London and come work for you)

## supporting applications

* [wjisk](https://github.com/kevinforrestkeyes/wjisk)
* [popgoblin](https://github.com/kevinforrestkeyes/popgoblin)
* [anpoorte](https://github.com/kevinforrestkeyes/anpoorte)
