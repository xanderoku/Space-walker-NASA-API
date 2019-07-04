const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req, res) => {
  res.render('hello', {name: 'world!'});
})

router.get('/feedback', (req, res) => {
  console.log(req.query);
  const options = {
    name: req.query.name,
    height: req.query.height
  }
  res.render('feedback.hbs', options);
});

router.post('/feedback', (req,res) => {
  // res.redirect('/');
  console.log(req.body);
  fs.writeFile('db.json', JSON.stringify(req.body));
  res.json({status: "Success"});
})

module.exports = router;
