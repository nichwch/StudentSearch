// import SearchAndScrapeText from "../SearchAndScrapeText";
// import * as SearchAndScrapeText from '../SearchAndScrapeText';

// const scraper = require('../SearchAndScrapeText');
// const params = require('../compile_params');
const rawEasy = require('./easyOut.js');
const rawMedium = require('./mediumOut.js');
const rawHard = require('./hardOut.js');

const arr1 = require('./array1.js');
const arr2 = require('./array2.js');
const arr3 = require('./array3.js');

const brain = require('brain.js');
const net = new brain.NeuralNetwork();

const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

var fs = require('fs');
var file = fs.createWriteStream('model.js');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


async function processData(){
  var trainingData = [];
  var totalLength = rawEasy.length+rawMedium.length+rawHard.length;

  console.log("EASY",rawEasy.length);
  console.log("MED",rawMedium.length);
  console.log("HARD",rawHard.length);

  trainingData = trainingData.concat(arr1);
  trainingData = trainingData.concat(arr2);
  trainingData = trainingData.concat(arr3);

  trainingData = shuffle(trainingData);

  // for(var i = 0;i<rawEasy.length;i++)
  // {
  //   console.log((i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawEasy[i]);
  //   toPush = await params(toPush);
  //   console.log("TOPUSH",toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",EASY);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:EASY}").concat(', '));
  //   trainingData.push({input:toPush,output:EASY});
  // }
  //
  // for(var i = 180;i<rawMedium.length;i++)
  // {
  //   console.log((rawEasy.length+i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawMedium[i]);
  //   toPush = await params(toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",MEDIUM);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:MEDIUM}").concat(', '));
  //   trainingData.push({input:toPush,output:MEDIUM});
  // }
  //
  // for(var i = 0;i<rawHard.length;i++)
  // {
  //   console.log((rawEasy.length+rawMedium.length+i)*100/totalLength,"% done");
  //   let toPush = await scraper.scrape(rawHard[i]);
  //   toPush = await params(toPush);
  //   if(toPush == null)
  //   {
  //     console.log("FAILURE",HARD);
  //     continue;
  //   }
  //   file.write(("{input:["+toPush+"],output:HARD}").concat(', '));
  //   trainingData.push({input:toPush,output:HARD});
  // }

  //
  // file.write("]\nmodule.exports = rawText");
  // file.end();
  net.train(trainingData, {
                            // Defaults values --> expected validation
      iterations: 20000,    // the maximum times to iterate the training data --> number greater than 0
      errorThresh: 0.05,   // the acceptable error percentage from training data --> number between 0 and 1
      log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
      logPeriod: 1,        // iterations between logging out --> number greater than 0
      learningRate: 0.0005,    // scales with delta to effect training rate --> number between 0 and 1
      momentum: 0.8,        // scales with next layer's change value --> number between 0 and 1
      callback: null,       // a periodic call back that can be triggered while training --> null or function
      callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
      timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
   });
   const toJSON = net.toJSON();
   file.write("var model = ");
   file.write(JSON.stringify(toJSON));
   file.write("; \nmodule.export = model");
}

processData();
