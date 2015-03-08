'use strict';

// console.log('\'Allo \'Allo! Content script');

function getPrice(){
    var promoPriceEl = document.querySelector('.tm-promo-price > .tm-price');
    var originPriceEl = document.querySelector('.tm-price-panel .tm-price');
    if(promoPriceEl){
        return promoPriceEl.innerHTML;
    }else if(originPriceEl){
        return originPriceEl.innerHTML;
    }
}

if(location.host.indexOf('tmall.com') !== -1 ) {
    // 等待2s
    setTimeout(function(){
        var price = getPrice();
        console.log('价格', price);
        chrome.runtime.sendMessage({price: price}, function(response) {
            console.log(response.farewell);
        });
    }, 2000)

}
