const puppeteer = require('puppeteer');
const request = require('request');

var searchAndScrapeText = async function(searchQuery){
  const links = await getLinks(searchQuery);


   var rawText = [];
   for (var i = 0;i<links.length;i++){
     var str = await scrape(links[i]);
     console.log(str);
     rawText.push(str);
   }
   console.log(rawText);
   return rawText;
}

var getLinks = async function (query){
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.keyboard.type(query+" -site:youtube.com");
  await page.keyboard.press('Enter');
  await page.waitForSelector('.r a');

  //scrape links off of results page
  // const links = await page.$eval('a');
  const links = await page.$$eval('.r a', anchors => { return anchors.filter(
      (a)=>
      {
        let link = a.textContent;
        if(link.indexOf('http')<0)
        {
          return false;
        }
        return true;
      }
    ).map(a => {
     let link = a.textContent;
     link = link.substring(link.indexOf('http'));
     return link;
   }) }).catch(err=>{console.log(err)});
   page.close();
   browser.close();
   return links;

}

var scrape = async function (link){
  console.log("LINK: ",link);
  let content = await getHTML(link);
  content = processString(content);
  if(content == null)
  {

    return null;
  }
  return content;
}

var getHTML = async function (url) {
  var rawHTMLPromise = new Promise((resolve, reject)=> {
    request({
      method: 'GET',
      url: url
  }, function(err, response, body) {
      if(err){
        reject();
      }
      resolve(body);
    });
  }).catch(err=>{console.log(err)});

  var rawHTML = await rawHTMLPromise;
  return rawHTML;
};

function returnDomainExt(link)
{
  var a1 = link.substring(link.indexOf('.'));
  return a1.substring(0,link.indexOf('/')-2)
}

function processString(string)
{
  var content = string;
  if(content == undefined)
  {
    return null;
  }
  // while(string.indexOf('<script>')!=-1)
  // {
  //   if(string.indexOf('</script>')!=-1)
  //   {
  //     content = [string.substring(0,string.indexOf('<script>')), string.substring(string.indexOf('</script>'),string.length)].join('');
  //   }
  // }

  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  content = content.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/style>/gi, '');
  content = content.replace(/<(?:.|\n)*?>/gm, ''); //strip html into plaintext
  content = content.replace(/\s+/g,' ').trim();

  if(content.length>20000)
  {
    content = content.substring((content.length/2)-7000,(content.length/2)+7000);
  }
  return content
}

// getLinks("lol");

// searchAndScrapeText("integrals");

module.exports.searchAndScrapeText = searchAndScrapeText;
module.exports.getLinks = getLinks;
module.exports.scrape = scrape;

;
