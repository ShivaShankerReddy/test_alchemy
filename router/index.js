const express = require('express');
const axios = require('axios');
const date = require('date-and-time');
const NewsAPI = require('newsapi');
const jwt = require('jsonwebtoken');
const { body, validationResult, query } = require('express-validator');

const verifyToken = require('../auth');

// initiating router calls
const router = express.Router();

// fetching weather data
// https://openweathermap.org/api/one-call-api#current
// as per the api it's not taking city name but lat's and long's of city
router.get('/weather',
  query('lat').isFloat(),
  query('long').isFloat(), (req, res) => {
    try {
      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { WEATHER_API_KEY } = process.env;

      // as per the requirement and documentation of weather api city name is not taking
      const lat = (req.query.lat || 25.39242);
      const long = (req.query.long || 68.373657);

      const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts,current&appid=${WEATHER_API_KEY}`;
      axios.get(URL)
        .then((response) => {
          const { daily } = response.data;
          const count = 0;
          const data = {};
          const individualData = [];

          // iteration due to requirement of 5 days instead of 8 days as per documentation
          Object.entries(daily).forEach(([key, value]) => {
            if (key < 5) {
              const dateObj = new Date(value.dt);
              individualData.push({
                date: date.format(dateObj, 'ddd, MMM DD YYYY'),
                main: value.weather[0].main,
                temp: value.temp.day,
              });
            }
            data.data = individualData;
            data.count = count;
            data.location = {
              lat,
              long,
            };
          });
          // for (const k of daily) {
          //   count += 1;
          //   const dateObj = new Date(k.dt);
          //   individualData.push({
          //     date: date.format(dateObj, 'ddd, MMM DD YYYY'),
          //     main: k.weather[0].main,
          //     temp: k.temp.day,
          //   });
          //   if (count >= 5) {
          //     data.data = individualData;
          //     data.count = count;
          //     data.location = {
          //       lat,
          //       long,
          //     };
          //     break;
          //   }
          // }
          return res.json(data);
        }).catch((err) => {
          console.log('err:   ', err);
          return res.status(400).send({
            msg: 'error occured while fetching data',
          });
        });
    } catch (err) {
      console.error('error in func:   ', err);
      return res.status(500).send({
        msg: 'Internal serer error',
      });
    }
    return null;
  });

router.post('/news', verifyToken, (req, res) => {
  console.log('params:     ', req.query);
  const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
  if (req.query.search) {
    newsapi.v2.everything({
      q: req.query.search,
    }).then((response) => {
      if (response.articles.length > 0) {
        const finalData = {};
        const data = response.articles.map((resp) => (
          {
            author: resp.author,
            headlines: resp.title,
            link: resp.url,
          }
        ));
        finalData.count = response.articles.length;
        finalData.data = data;
        return res.json(finalData);
      }
      return res.send({
        msg: `${req.query.search} has zero entries`,
      });
    }).catch((err) => {
      console.error('err:    ', err);
      return res.status(500).send({
        msg: 'Internal server error',
      });
    });
  } else {
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    // https://newsapi.org/sources
    newsapi.v2.topHeadlines({
      language: 'en',
      country: 'in',
    }).then((response) => {
      if (response.articles.length > 0) {
        const finalData = {};
        const data = response.articles.map((resp) => ({
          author: resp.author,
          headlines: resp.title,
          link: resp.url,
        }));
        finalData.count = response.articles.length;
        finalData.data = data;
        return res.json(finalData);
      }
      return res.send({
        msg: 'Oops..!  zero entries',
      });
    }).catch((err) => {
      console.error('err:    ', err);
      return res.status(500).send({
        msg: 'Internal server error',
      });
    });
  }
});

router.post('/signup', body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('password').isAlphanumeric(),
  body('name').custom((value) => (value ? Promise.resolve(true) : Promise.reject(new Error('Please enter user name')))), (req, res) => {
    try {
      // const { name, password, email } = req.body;

      // Validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      // password here..
      // Encrypt user password
      // encryptedPassword = await bcrypt.hash(password, 10);

      // const token = jwt.sign(
      //     { user_id: email },
      //     process.env.TOKEN_KEY,
      //     {
      //         expiresIn: "2h",
      //     }
      // );

      // creating userdata in database
      const user = {};

      // user.token = token;
      user.msg = 'user registered successfully..!';
      return res.status(200).send({
        data: user,
      });
    } catch (err) {
      console.error('err: ', err);
      return res.status(500).send({
        msg: 'internal server error',
      });
    }
  });

router.post('/login', body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        return res.status(400).send('All input is required');
      }

      const token = jwt.sign({ user_id: email }, process.env.TOKEN_KEY, { expiresIn: '2h' });
      const user = {};
      // // save user token
      user.token = token;
      user.msg = 'user logged in successfully..!';
      return res.status(200).json(user);
    } catch (err) {
      console.log('err:    ', err);
      return res.status(500).send({
        msg: 'internal server error',
      });
    }
  });

router.put('/logout', verifyToken, (req, res) => {
  const token = req.body;
  jwt.sign(token, '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: 'You have been Logged Out' });
    } else {
      console.error('err:    ', err);
      res.status(500).send({
        msg: 'internal server error',
      });
    }
  });
});

module.exports = router;
