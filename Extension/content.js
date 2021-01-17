/**
 * @fileoverview This run as content script of the extention. This send URL to the background.js.
 * @author hansajithsenarath@gmail.com (Deshitha Hansajith)
 */





 /**
 * This get value of state variable continue with variable named as status.
 * This send  message to background.js that include URL of current tab.
 * @param {!Boolean} status Status of extension is Off or not.
 * @param {!String} url URL of current active tab.
 */
chrome.storage.local.get(['state'], function(result) {
    if(result.state == undefined) {
        var state = true;
        chrome.storage.local.set({'state': state}, function() {});
    }else{
        var state = result.state;
    }
    if(state == true){
        const url = window.location.toString();
        chrome.runtime.sendMessage({ URL: url });
    }
});

