var str = "This is a trial to test all the different functions. I am trying to write a second sentence."
main(str)

function frequency(common_words, str_array) {
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

function main(str) {
    var fs = require('fs');
    var common_words = fs.readFileSync('./all.txt').toString().split("\n");
    var text = str.split(" ");
    //var main = "Hello world this is sndka sd. This is another sentence.";
    //var str = main.split(" ");
    //var cwords = ["Hello", "world"];
    console.log(frequency(common_words,text));
    console.log(average_len(text));
    console.log(diversity(text));
    console.log(sentence_len(text));
    console.log(std_dev(text));
}

function average_len(str_array){
    var count = 0;
    for(var i = 0; i < str_array.length; i++){
        count += (str_array[i]).length;
    }
    return count/str_array.length;
}

function diversity(str_array){
    var com = new Set();
    for(var i = 0; i < str_array.length; i++){
        if(!com.has(str_array[i])){
            com.add(str_array[i]);
        }
    }
    return com.size;
}

function sentence_len(str_array){
    var count = 0;
    for(var i = 0; i < str_array.length; i++){
        if(str_array[i].indexOf(".") >= 0){
            count++;
        }
    }
    return str_array.length/count;

}

function std_dev(str_array){
    var count = 0;
    var total = 0;
    var ave = average_len(str_array);
    for(var i = 0; i < str_array.length; i++){
        count++;
        total += Math.pow((str_array[i].length - ave), 2)
    }
    return Math.sqrt(total/count);
}
