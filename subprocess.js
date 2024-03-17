import puppeteer from 'puppeteer';
import 'dotenv/config'

const twitchBaseUrl = process.env.TWITCH_BASE_URL;
const channelName = process.env.TWITCH_CHANNEL;

const goToTwichPage = () => {
  // Launch the browser and open a new blank page
    return new Promise((resolve, reject) => {
      puppeteer.launch({headless: false}).then((browser) => {
      browser.newPage().then((page) => {
      // Navigate the page to a URL
      page.goto(process.env.PROXY_URL).then(() => {
        page.setViewport({width: 1080, height: 1024}).then(() => {
          page.waitForFunction("document.querySelector('.fc-button')").then(() => {
            page.$('.fc-button').then((button) => {
             console.log("bibi");
              button.click().then(() => {
                page.type('.typeahead__query', twitchBaseUrl + channelName).then(() => {
                  const searchResultSelector = '#requestSubmit';
                  page.waitForSelector(searchResultSelector).then(() => {
                      page.click(searchResultSelector).then(() => {
                        /*page.waitForSelector(
                        '[data-test-selector="chat-private-callout-queue__callout-container"]'
                        ).then(() => {
                          page.evaluateHandle(() => document.querySelector('[data-test-selector="chat-private-callout-queue__callout-container"]')
                          ).then(() => {
                              // TODO -- keep process open
                              console.log(`Page is fuly loaded, viewer bot ready`);
                              resolve({processFinishedWithoutErrors: true});
                          });
                        });*/
                        resolve({processFinishedWithoutErrors: true});
                      });
                  });
                });  
              });
            });
          });
          });
          });
        });
      });
  }).catch((e) => reject({processFinishedWithoutErrors: false, error: e}));
}

goToTwichPage().then((res) => {
  console.log(res);
});
