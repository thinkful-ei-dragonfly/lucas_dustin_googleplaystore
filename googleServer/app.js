const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(morgan('common'))

const playstore = require('./playstore')

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query

  if (sort || genres) {
    if (sort) {
      if (!['Rating', 'App'].includes(sort)) {
        res.status(400).send('Can only sort by Rating or App')
      }
      if (['Rating'].includes(sort)) {
        playstore.sort((a,b) => {
          return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
        })
      } else {
        playstore.sort((a,b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
      }


    }
    if (genres) {
      let results = playstore
              .filter(app => {
                app.Genres.toLowerCase().includes(genres.toLowerCase())
              });


    }
  }


  // res.send(playstore)
  res.send(playstore)
})

app.listen(8000, () => {
  console.log('Server is up and running on localhost:8000');
})
