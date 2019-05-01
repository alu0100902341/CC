let Crawler = require("js-crawler");
const readline = require('readline');
const open = require("open");

let crawler = new Crawler().configure({ignoreRelative: false, depth: 2});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Keyword: ', (answer) => {
    // TODO: Log the answer in a database
    crawling_function(answer);
    rl.close();
  });




const crawling_function = (answer) => { 
    
    crawler.crawl({
        url: "https://www.chollometro.com/",
        success: function(page) {
            if (page.url.includes("/ofertas/")){
                if (page.url.includes(answer.toLowerCase())){
                    console.log(page.url);
                    open(page.url, {app: ["C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome"]});
                }
            }
        },
        failure: function(page) {
            //console.log(page.status);
        },
        finished: function(crawledUrls) {
            console.log("Finished");
        }
    });
}