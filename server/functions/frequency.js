
var frequency = function(str_array) {
    var fs = require('fs');
    var common_words = fs.readFileSync('./all.txt').toString().split("\n");
    var count = 0;
    var common = new Set();
    for(var i = 0; i < common_words.length; i++){
        common.add(common_words[i]);
    }
    for(var i = 0; i < str_array.length; i++){
        if(common.has(str_array[i])){
            count++;
        }
    }
    return count/str_array.length;
}
module.exports = frequency;
