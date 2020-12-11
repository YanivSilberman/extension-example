import { browser } from 'webextension-polyfill-ts';

/**
 * 
 * Listen to messages from content script
 * 
 */
browser.runtime.onMessage.addListener(async (request) => {
  if (!('action' in request)) {
    return;
  }

  switch (request.action) {
    // handle message from content script with text content
    case 'page-content': {
      // do calculations here and return them
      return true;
    }

    default: 
      return true;
  }
});

/**
 * 
 * Listen to user opening new web page
 * 
 */
browser.tabs.onUpdated.addListener(async (_, { status }) => {
  if (status == 'complete') {
    const [{ id }] = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.executeScript(id, {
      file: 'content.js',
      runAt: 'document_start'
    });
  }
});
