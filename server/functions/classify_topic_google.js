const textfile = require('./Chem.js');
var classify_topic_google = async function(raw_text_in) {
const language = require('@google-cloud/language');
// Creates a client
    const client = new language.LanguageServiceClient();



    // Prepares a document, representing the provided text
    const document = {
        content: raw_text_in,
        type: 'PLAIN_TEXT',
    };

    var valueBad = false;
    var results = await client.classifyText({document: document}).catch(err => {
        console.log('ERROR:', err);
        valueBad = true;
        });
    if(valueBad){
      return null;
    }
    const classification = results[0];

    console.log('Categories:');
    var tensorS = "";
    classification.categories.forEach(category => {
        tensorS += category.name + " ";
    });
    tensorS = tensorS.trim();
    console.log("tensorS " + tensorS)
    return(tensorS);



}
module.exports = classify_topic_google;
