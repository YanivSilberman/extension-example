import { browser } from 'webextension-polyfill-ts';

/**
 * Listen to messages from background script
 */
browser.runtime.onMessage.addListener(async (request) => {
  if (!('action' in request)) {
    return;
  }

  switch (request.action) {
    case 'inject-highlights': {
      const { highlights } = request;

      // put them in the page

      return true;
    }
 
    default:
      return true;
  }
});

/**
 * extract content from the page
 */
(() => {
  // iterate elements with tree walker taking all the nodes and text you need

  // send them to the backend
  browser.runtime.sendMessage({
    action: 'page-content',
    // add any arguments you want
  });
})();