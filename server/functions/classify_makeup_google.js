// Imports the Google Cloud client library

function pos_to_int(arr) {
    var grand_hash = 0;
    arr.forEach(pos => {
        var hash = 0
        if (pos == "NOUN") {
            hash = 1
        } else if (pos == "VERB") {
            hash = 2
        } else if (pos == "DET") {
            hash = 3
        } else if (pos == "NUM") {
            hash = 4
        } else if (pos == "ADJ") {
            hash = 5
        } else if (pos == "ADP") {
            hash = 6
        } else if (pos == "PUNCT") {
            hash = 7
        } else if (pos == "CONJ") {
            hash = 8
        } else if (pos == "ADV") {
            hash = 9
        } else {
            // console.log("Uncategorized type" + pos)
        }
        //ret = (31 * ret + this.charCodeAt(i)) << 0
        grand_hash = (31 * grand_hash + hash) << 0;
    })
    console.log("grand_hash" + grand_hash);
    return grand_hash;
}

var classify_makeup_google = async function(text) {
    const language = require('@google-cloud/language');

    // Creates a client
    const client = new language.LanguageServiceClient();

    /**
     * TODO(developer): Uncomment the following line to run this code.
     */


    // Prepares a document, representing the provided text
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    var valueBad = false
    // Detects syntax in the document
    var results = await client
        .analyzeSyntax({
            document: document})
        .catch(err => {
            console.log('ERROR1:', err);
            valueBad = true;
        });
    if(valueBad){
      return null;
    }
    const syntax = results[0];

    //console.log('Tokens:');
    var pos_array = [];
    syntax.tokens.forEach(part => {
        //console.log(`${part.partOfSpeech.tag}`);
        pos_array.push(part.partOfSpeech.tag);
        // console.log(`Morphology:`, part.partOfSpeech);
    });
    return(pos_to_int(pos_array));
}

module.exports = classify_makeup_google;
