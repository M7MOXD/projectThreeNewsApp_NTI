// require request
const request = require('request');

// Get News Function
const getNews = (country, callback) => {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=d4aa218463a04c94af5fe97dd755ced3`;
  request({ url, json: true }, (error, response) => {
    // Low Level Erroe: Internet Connection/Wrong Url
    if (error) {
      callback(error, undefined);
    }
    // Bad request: Invalid API Key/Missing Query/etc
    else if (response.body.message) {
      callback(response.body.message, undefined);
    }
    // Bad request: Missing Country Name
    else if (response.body.articles.length === 0) {
      callback('Wrong Country Name', undefined);
    } else {
      callback(undefined, response.body.articles);
    }
  });
};

// Test Example
// getNews('us', (error, response) => {
//   console.log(error);
//   console.log(response);
// });

// export getNews
module.exports = getNews;
