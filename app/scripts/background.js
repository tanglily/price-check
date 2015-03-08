'use strict';

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

function setBadge(text){
    chrome.browserAction.setBadgeText({text: text});
}
