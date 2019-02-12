const alltext = require('./all.js');

function str_atr(common_words, str_array){
 var attributes = [];
  var ave_len = 0;
  var count = 0;
  var diversity = new Set();
  var sentence_len = 0;
  var std_dev = 0;
  var frequency = 0;
  //make a set common words
  var common = new Set();
  for(var i = 0; i < common_words.length; i++){
      common.add(common_words[i].trim());

  }


  for(var i = 0; i < str_array.length; i++){
    if(common.has(str_array[i])){
          count++;

      }
      if(!diversity.has(str_array[i])){
          diversity.add(str_array[i]);
      }
      if(str_array[i].indexOf(".") >= 0){
          sentence_len++;
      }
      ave_len += str_array[i].length;
  }
  sentence_len = str_array.length / sentence_len;
  ave_len = ave_len / str_array.length;
  console.log("COUNT",count);
  frequency = count / str_array.length;
  std_dev = stad_dev(str_array, ave_len);
  attributes = [frequency, ave_len, diversity.size, sentence_len, std_dev];
  return attributes;
}

function stad_dev(str_array, ave){
    var count = 0;
    var total = 0;
    for(var i = 0; i < str_array.length; i++){
        count++;
        total += Math.pow((str_array[i].length - ave), 2)
    }
    return Math.sqrt(total/count);
}

function main(str) {
    var fs = require('fs');
    var common_words = alltext.split("\n");
    var text = str.split(" ");
    //var main = "Hello world this is sndka sd. This is another sentence.";
    //var str = main.split(" ");
    //var cwords = ["Hello", "world"];
    return(str_atr(common_words, text));
}

module.exports = main;
