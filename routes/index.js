const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { siteTitle: 'Space walker' });
});

router.get('/apod', async (req, res) => {
  const request = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  );
  const response = await request.json();
  const { date, explanation, url, hdurl, title } = response;
  res.render('apod', { date, hdurl, url, title, explanation });
});

router.post('/timetravel', async (req, res) => {
  const request = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${req.body.date}&api_key=${process.env.NASA_API_KEY}`
  );
  const response = await request.json();
  res.json(response);
});

router.get('/carousel', (req, res) => {
  res.render('carousel');
});

router.get('/opportunity', (req, res) => {
  res.render('opportunity');
});

router.get('/map', (req, res) => {
  res.render('map');
});

module.exports = router;
