// import { browser } from 'webextension-polyfill-ts';

// /**
//  * 
//  * Listen to messages from content script
//  * 
//  */
// browser.runtime.onMessage.addListener(async (request) => {
//   if (!('action' in request)) {
//     return;
//   }

//   switch (request.action) {
//     // handle message from content script with text content
//     case 'page-content': {
//       // do calculations here and return them
//       return true;
//     }

//     default: 
//       return true;
//   }
// });

/**
 * 
 * Listen to user opening new web page
 * 
 */

console.log('in');
chrome.tabs.onUpdated.addListener(async (_, { status }) => {
  console.log('status', status);
  if (status == 'complete') {
    const [{ id }] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('id', id);
    chrome.tabs.executeScript(id, {
      file: 'content.js',
      runAt: 'document_start'
    });
  }
});
