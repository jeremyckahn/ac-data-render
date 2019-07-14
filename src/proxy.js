const path = require('path');
const envFile = path.resolve(
  process.cwd(),
  process.env.DEVELOPMENT ? '.env.local' : '.env'
);
require('dotenv').config({ path: envFile });

const app = require('express')();
const srv = require('http').createServer(app);
const request = require('request');

const API_KEY = process.env.API_KEY;
const apiRoot = 'https://lamppoststudios.api-us1.com/api/3/';

require('now-logs')(API_KEY);

app.get('/:endpoint', function(req, res, next) {
  const {
    query,
    params: { endpoint },
  } = req;

  const apiArgs = Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  request(
    {
      url: `${apiRoot}${endpoint}?${apiArgs}`,
      headers: {
        'Api-Token': API_KEY,
      },
    },
    (error, apiResponse, body) => {
      res.send(body);
    }
  );
});

srv.listen(3000, function() {
  console.log('Listening on 3000');
});
