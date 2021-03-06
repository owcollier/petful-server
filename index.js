'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const Queue = require('./queue');

const app = express();

const cats = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Mittens',
    sex: 'Male',
    age: 4,
    breed: 'Bengal',
    story: 'Owner lost in a wormhole incident'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Moon',
    sex: 'Female',
    age: 1,
    breed: 'Bengal',
    story: 'Brought to shelter'
  }
];

const dogs = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Donovan',
    sex: 'Male',
    age: 6,
    breed: 'Golden Retriever',
    story: 'Family moved'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Barbara',
    sex: 'Female',
    age: 1,
    breed: 'Golden Retriever',
    story: 'Found wandering the street'
  }
];

const catsQueue = new Queue();

catsQueue.enqueue(cats[0]);
catsQueue.enqueue(cats[1]);
catsQueue.enqueue(cats[2]);

const dogsQueue = new Queue();

dogsQueue.enqueue(dogs[0]);
dogsQueue.enqueue(dogs[1]);
dogsQueue.enqueue(dogs[2]);

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req, res) => {
  //show the cat that is next in line to be adopted
  return res.json(catsQueue.first.value);
});

app.get('/api/dog', (req, res) => {
  return res.json(dogsQueue.first.value);
});

app.delete('/api/cat', (req, res) => {
  const adopted = catsQueue.first.value;
  catsQueue.dequeue();
  return res.json(`${adopted.name} successfully adopted!`);
});

app.delete('/api/dog', (req, res) => {
  const adopted = dogsQueue.first.value;
  dogsQueue.dequeue();
  return res.json(`${adopted.name} successfully adopted!`);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = {app};
