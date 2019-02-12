// import SearchAndScrapeText from "../SearchAndScrapeText";
// import * as SearchAndScrapeText from '../SearchAndScrapeText';

const scraper = require('../SearchAndScrapeText');
const rawEasy = require('./easyOut.js');
const rawMedium = require('./mediumOut.js');
const rawHard = require('./hardOut.js');

const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

var fs = require('fs');
var file = fs.createWriteStream('array.js');
file.write("var rawText2 =  [");

function removeQuotes(text){
  console.log(escape(text));
}


async function processData(){
  var trainingData = [];
  var totalLength = rawEasy.length+rawMedium.length+rawHard.length;

  for(var i = 0;i<rawEasy.length;i++)
  {
    console.log((i)*100/totalLength,"% done");
    let toPush = await scraper.scrape(rawEasy[i]);
    if(toPush == null)
    {
      console.log("FAILURE",EASY);
      continue;
    }
    file.write("\""+toPush+" \"".concat(', '));
    trainingData.push({input:toPush,output:EASY});
  }
  for(var i = 0;i<rawMedium.length;i++)
  {
    console.log((rawEasy.length+i)*100/totalLength,"% done");
    let toPush = await scraper.scrape(rawMedium[i]);
    if(toPush == null)
    {
      console.log("FAILURE",MEDIUM);
      continue;
    }
    file.write(" \""+toPush+" \"".concat(', '));
    trainingData.push({input:toPush,output:MEDIUM});
  }
  for(var i = 0;i<rawHard.length;i++)
  {
    console.log((rawEasy.length+rawMedium.length+i)*100/totalLength,"% done");
    let toPush = await scraper.scrape(rawHard[i]);
    if(toPush == null)
    {
      console.log("FAILURE",HARD);
      continue;
    }
    file.write(" \""+toPush+" \"".concat(', '));
    trainingData.push({input:toPush,output:HARD});
  }
  console.log(trainingData);

  file.write("]\nmodule.exports = rawText");
  file.end();
  net.train(trainingData, {log: true});
}

processData();
