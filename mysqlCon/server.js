const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// Connect to MySql DB
const db = mysql.createConnection({
  host: '3.139.70.142',
  user: 'myuser',
  password: 'mypass',
  database: 'tesla_news',
  port: 3306
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('MySql server connected.');
});

app.use(cors(corsOptions));

// DB Functions
// Select all date from DB
app.get("/api/articles/all/:group/:start_date/:end_date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Date between '${req.params.start_date}' and '${req.params.end_date}' ORDER BY ${req.params.group}`;
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    //console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

// Select using topic from db
app.get("/api/articles/topic/:topic/:group/:start_date/:end_date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Topic like "%${req.params.topic}%" AND Date between '${req.params.start_date}' and '${req.params.end_date}' ORDER BY ${req.params.group}`;
  // set topic = something doesn't work with the current mysql database
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    //console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

// Select using publisher from db
app.get("/api/articles/publisher/:publisher/:group/:start_date/:end_date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Publisher like '%${req.params.publisher}%' AND Date between '${req.params.start_date}' and '${req.params.end_date}' ORDER BY ${req.params.group}`;
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    // console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

// Select using headline from db
app.get("/api/articles/headline/:headline/:group/:start_date/:end_date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Headline like '%${req.params.headline}%' AND Date between '${req.params.start_date}' and '${req.params.end_date}' ORDER BY ${req.params.group}`;
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    // console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

// Select using content from db
app.get("/api/articles/content/:content/:group/:start_date/:end_date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Content like '%${req.params.content}%' AND Date between '${req.params.start_date}' and '${req.params.end_date}' ORDER BY ${req.params.group}`;
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    // console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

// Select article with id
app.get("/api/articles/articleId/:articleId", (req, res) => {
  let sql = `SELECT content FROM tesla_news WHERE article_id = '${req.params.articleId}'`;
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    //console.log(results[0].content);
    res.send(results[0].content);
  });
});

// Select article with a single date
app.get("/api/articles/single_date/:date", (req, res) => {
  let sql = `SELECT * FROM tesla_news WHERE Date = '${req.params.date}'`;
  //console.log('stock testing');
  console.log(sql);
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    // console.log(results);
    // res.send('Articles fetched ...');
    res.send(results);
  });
});

app.listen("3010", () => {
  console.log("Server started on port 3010");  
});