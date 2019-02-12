var sentence_len = function(str_array){
    var count = 0;
    for(var i = 0; i < str_array.length; i++){
        if(str_array[i].indexOf(".") >= 0){
            count++;
        }
    }
    return str_array.length/count;

}
module.exports = sentence_len;
