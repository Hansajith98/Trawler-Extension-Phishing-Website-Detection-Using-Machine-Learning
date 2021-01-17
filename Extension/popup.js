
/**
 * @fileoverview This run as script of the popup.html. Provide eventListener for OnOffButton.
 * Check status of extension on/off toggle button and change it's status. Also change status 
 * variable value with on/off  toggle buttton status.
 * @author hansajithsenarath@gmail.com (Deshitha Hansajith)
 */



chrome.storage.local.get(['state'], function(result) {
    if(result.state != undefined) {
        document.getElementById('switch').value = result.state;
        console.log("switch 1 ", document.getElementById('switch').value);
    }
});


/**
 * This call addEventListenerForOnOffButton function when tab is loaded or tab's URL is changed.
 */

chrome.tabs.onUpdated.addListener(function () {
    addEventListenerForOnOffButton()
});


/**
 * This add event listener function called clicks for on/off toggle button.
 */

function addEventListenerForOnOffButton() {
    var checkbox = document.getElementById("OnOffButton");
    if (checkbox !== null) {
        checkbox.addEventListener('click', clicks);
    }
}

/**
 * This execute when on/off toggle button clicked and save it's status in local chrome storage as 'status'.
 * @param {!Boolean} status Status of extension is Off or not.
 */

function clicks(){
    var cb = document.getElementById('switch');
    if(cb.checked){
        state = cb.checked;
        chrome.storage.local.set({'state': state}, function() {});
        console.log("switch 1 ", document.getElementById('switch').checked);
    }
    else{
        state = cb.checked;
        chrome.storage.local.set({'state': state}, function() {});
        console.log("switch 1 ", document.getElementById('switch').checked);
    }
}

