var diversity = function(str_array){
    var com = new Set();
    for(var i = 0; i < str_array.length; i++){
        if(!com.has(str_array[i])){
            com.add(str_array[i]);
        }
    }
    return com.size;
}
module.exports =
