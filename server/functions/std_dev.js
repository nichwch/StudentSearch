var average_len = require('./average_len.js')
std_dev = funciton(str_array){
    var count = 0;
    var total = 0;
    var ave = average_len(str_array);
    for(var i = 0; i < str_array.length; i++){
        count++;
        total += Math.pow((str_array[i].length - ave), 2)
    }
    return Math.sqrt(total/count);
}
module.exports = std_dev;
