const schedule = require('node-schedule');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const url = require('url');

// const job = schedule.scheduleJob('*/5 * * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

// const launchChrome = (url) => {
//   chromeLauncher.launch({
//     startingUrl: url
//   })
//   .then(chrome => {
//     const opts = {
//       port: chrome.port
//     };
//     lighthouse(url, opts).then(results => {
//       chrome.kill();
//       console.log(results.report);
//     });
//   });
// }

const launchChromeAndRunLighthouse = url => {
  return chromeLauncher.launch().then(chrome => {
    const opts = {
      port: chrome.port
    };
    return lighthouse(url, opts).then(results => {
      return chrome.kill().then(() => results.report);
    });
  });
};

// launchChrome('http://serene.dothome.co.kr/litho/');

launchChromeAndRunLighthouse("http://serene.dothome.co.kr/litho/").then(results => {

  if (!fs.existsSync(getToday())) {
    fs.mkdirSync(getToday());
  }
  fs.writeFile(
    `${getToday()}/report.json`,
    results,
    err => {
      if (err) throw err;
    }
  )
});

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
}