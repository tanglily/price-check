'use strict';

// console.log('\'Allo \'Allo! Popup');

function getById(id){
    return document.getElementById(id);
}


function updateTab(url){
    chrome.tabs.update({
        url: url
    })
}

function getTmallItemUrl(id){
    if(String(id).indexOf('tmall.com') > -1) return id;
    return 'http://detail.tmall.com/item.htm?id=' + id;
}

function initContentMessage(){

    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            showPrice(message.price)
        }
    )
}

function showPrice(price){
    //$('#price').html(price)
    getById("price").innerHTML = price;

}

getById("btn").onclick = function(){
    var txt = getById("item").value;
    var itemUrl = getTmallItemUrl(txt);
    updateTab(itemUrl);
}

initContentMessage();
