const classify_makeup_google = require('./classify_makeup_google.js');
const classify_topic_google = require('./classify_topic_google.js');
const classify_text_attributes = require('./self_string_categorization.js');
const test = require("./Chem.js").text
function hashCode(str) {
    for (var ret = 0, i = 0, len = str.length; i < len; i++) {
        ret = (31 * ret + str.charCodeAt(i)) << 0;
    }
    return ret;
};


/**
*ARRAY SYNTAX
0: Google Makeup Of Parts of Speech
1: Google Topic SUBJECT Hashed String
2: frequency
3: avg word len
4: diversity
5: sentence_length
6: std deviation of word length

*/

const compile_params = async function(input_string) {
    var params = []
    var google_makeup_hash = await classify_makeup_google(input_string);
    if(google_makeup_hash==null)
    {
      return null;
    }
    console.log("Past Makeup Hash" + google_makeup_hash)
    var google_topic_string = await classify_topic_google(input_string);
    if(google_topic_string==null)
    {
      return null;
    }
    console.log("Past Topic Hash" + google_topic_string);
    var self_string_att = classify_text_attributes(input_string);
    params[0] = google_makeup_hash;
    params[1] = hashCode(google_topic_string);
    params[2] = self_string_att[0];
    params[3] = self_string_att[1];
    params[4] = self_string_att[2];
    params[5] = self_string_att[3];
    params[6] = self_string_att[4];
    console.log("__Past Param Assignment___");
    console.log(params);
    return params;
//     var google_makeup_promise = new Promise(function(resolve, reject) {
//         console.log("Finished google_makeup_promise")
//         classify_makeup_google(input_string).then(hash) => {
//             console.log("hash" + hash);
//             resolve(hash);
//         }
//
//     })
//     var google_topic_promise = new Promise(function(resolve, reject) {
//             var topic_string = classify_topic_google(input_string).then(topic_string) => {
//                 console.log("Finished google_topic_promise")
//                 resolve(topic_string);
//             });
//
//
//     })

// Promise.all([google_makeup_promise, google_topic_promise]).then(function(values) {
//     console.log("within finished promise")
//     params[0] = values[0];
//     params[1] = values[1].hashCode;
//     console.log(values[1].hashCode)
//     params[2] = self_string_att[0];
//     params[3] = self_string_att[1];
//     params[4] = self_string_att[2];
//     params[5] = self_string_att[3];
//     params[6] = self_string_att[4];
// })

}
console.log(compile_params(test));
module.exports = compile_params;
