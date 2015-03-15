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

function initContentMessage(){

    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            notifyPrice(message.price)
        }
    )
}

function notifyPrice(price){
    //$('#price').html(price)
    // getById("price").innerHTML = price;
    var $prices = $('#prices');
    var text = $prices.text();

    $prices.html(text + "\n" + (_currentItemIndex+1) + " " +_currentItemUrl + " " + price);

    getNextItemPrice();
}

var _currentItemIndex = -1;
var _currentItemUrl;
var _itemUrls;

function getItemsPrice(itemUrls){
    _itemUrls = itemUrls;
    getNextItemPrice();
}

function getItemPrice(itemUrl){
    _currentItemUrl = itemUrl;
    updateTab(itemUrl);
}

function getNextItemPrice(){
    var itemUrl = _itemUrls[++_currentItemIndex];
    if(itemUrl){
        getItemPrice(itemUrl);
    }
}

function getAllItemUrlFormHtml(html){
    var urls = [];
    $(html).find('a').each(function(){
        var href = $(this).attr('href');
        if(href.indexOf('detail.tmall.com/item.htm') > -1){
            urls.push(href);
        }
    });
    return urls;
}

function showItemsUrl(itemUrls){
    $('#urls').html('共找到' + itemUrls.length +'个商品地址\n' + itemUrls.join('\n'));
}

getById("btn").onclick = function(){
    var source = $('#source').val();
    var itemUrls = getAllItemUrlFormHtml(source);
    localStorage.source = source;
    showItemsUrl(itemUrls);
    getItemsPrice(itemUrls);
};

function restoreInput(){
    var source = localStorage.source;
    if(source){
        $('#source').val(source)
    }
}

initContentMessage();
restoreInput();
