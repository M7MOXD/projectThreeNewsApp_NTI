// Create Server
// require express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// require path && Set statics folder directory
const path = require('path');
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// require hbs && Set view engin && Set view path
const hbs = require('hbs');
const viewsPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// require tools: getNews
const getNews = require('./tools/getNews');

// Routes
// Home Page Route
app.get('/', (req, res) => {
  getNews('us', (error, response) => {
    if (error) {
      return res.send({ error });
    }
    res.render('index', {
      title: 'Home Page',
      response,
    });
  });
});

// 404 Page Route
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 PAGE',
  });
});

// run server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
