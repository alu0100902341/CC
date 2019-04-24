var request = require("request");
var cheerio = require("cheerio");
var URL = require("url-parse");

let pageToVisit = "https://www.chollometro.com/";
console.log(`Visiting page ${pageToVisit}`);

request(pageToVisit, (error, response, body) => {
  if (error) {
    console.log(`Error: ${error}`);
  }

  // Check status code (200 if HTTP OK)
  console.log(`Status code: ${response.statusCode}`);
  if (response.statusCode == 200) {
    // Parse the document body
    let $ = cheerio.load(body);
    console.log("Page title:  " + $("title").text());
    search($, "Corsair");
    collectLinks($);
  }
});

// Search word
const search = ($, word) => {
  let bodyText = $("html > body").text(); // parent > child
  if (bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    console.log(`${word} found!`);
    return true;
  }
  console.log(`${word} not found!`);
  return false;
};

const collectLinks = $ => {
  let allRelativeLinks = [];
  let allAbsoluteLinks = [];

  let relativeLinks = $("a[href^='/']");
  relativeLinks.each(i => {
    allRelativeLinks.push($(this).attr("href"));
    console.log(`${allRelativeLinks[i]}`);
  });

  let absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(i => {
    allAbsoluteLinks.push($(this).attr("href"));
    console.log(`${allAbsoluteLinks[i]}`);
  });

  console.log(`Found ${allRelativeLinks.length} relative links`);
  console.log(`Found ${allAbsoluteLinks.length} absolute links`);
};
