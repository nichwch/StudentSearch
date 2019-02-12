var average_len = function(str_array){
    var count = 0;
    for(var i = 0; i < str_array.length; i++){
        count += (str_array[i]).length;
    }
    return count/str_array.length;
}
module.exports = average_len;
