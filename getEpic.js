// const fetch = require('node-fetch');
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect('mongodb://localhost/NASA', { useNewUrlParser: true });

// const epic = require('./models/epic.js');

// async function getEpicData() {
//   const data = await fetch(
//     `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NASA_API_KEY}`
//   );
//   const main = await data.json();
//   console.log(main);

//   // map the items to an array of promises for created epic docs
//   const createdPromises = main.map(item => {
//     return epic.create({
//       file: item.image,
//       date: item.date
//     }); // returns a promise
//   });

//   Promise.all(createdPromises)
//     .then(results => {
//       res.json(results); // only sends when all docs have been created
//     })
//     .then(null, next); // error handler - pass to `next`
// }

// getEpicData();

// let counter = 0;
// main.forEach(item => {
//   epic.create(
//     {
//       file: item.image,
//       date: item.date
//     },
//     (err, doc) => {
//       if (err) {
//         return err;
//       }
//       counter += 1;
//       if (counter === main.length) return res.end();
//     }
//   );
// });
