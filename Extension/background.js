/**
 * @fileoverview This run as background script of the extention. Recives URL from content.js and
 *  send Seerver to check is it phishing or not with created machine learning model. Server 
 * return 0 for legitimate url and return 1 for phishing url. Then if it is phishing url, 
 * check is it in white list, if not phishing_warning.html will open in current active tab.
 * @author hansajithsenarath@gmail.com (Deshitha Hansajith)
 */









/**
 * This catching  message from content.js that include URL of current tab.
 * @param {Object} request Response from server.
 * @param {JSON} sender Casted format of response varibale to the json.
 */
chrome.runtime.onMessage.addListener(async function(request, sender) {
    console.log(request.URL, "{chrome.runtime.onMessage.addListener - request.URL}");
    if(request.URL !== ''){
        check_for_whitelist(sender, request);
    }
});



/**
 * This send URL to server and check Is url phishing or not  with response of server.
 * @param {Object} response Response from server.
 * @param {JSON} result Casted format of response varibale to the json.
 * For example:
 *     {
 *      "state": 0
 *     }
 */
async function check_url(sender, request) {
    try{
    await fetch("http://127.0.0.1:5000/", {    
        // Adding method type 
        method: "POST",      
        // Adding body or contents to send 
        body: JSON.stringify({ 
            url : request.URL
        }),      
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(result => {
        if(result.state == 1){
            console.log("URL detect as Phishing{fetch-then}");
            display_warning(sender, request);
        }else if(result.state == 0){
            console.log("URL detect as Legitimate{fetch-then}");
        }else{
            console.log("There is an error from server{fetch-then}");
        }
    });
    }catch(e) {
        console.log(e);
    }
}



/**
 * This show phishing_warning.html in current active tab.
 * @param {Object} response Response from server.
 * @param {JSON} result Casted format of response varibale to the json.
 * @private {string} PHISHING_WARNING_WHITELIST_KEY_
 */
function display_warning(sender, request) {
    let domain = new URL(request.URL);
    domain = domain.hostname;
    console.log(domain + " - domain"); 
    PHISHING_WARNING_WHITELIST_KEY_ = 'phishing_warning_whitelist';
    console.log(request.URL + " {display_warning}");
    var warning_url = chrome.extension.getURL('phishing_warning.html') +
        '?' + sender.tab.id +
        '&' + encodeURIComponent(domain || '');
    chrome.tabs.update({'url': warning_url});
    console.log("url updated{display_warning}");
};



/**
 * This check if URL is in white list and call check_url() or return.
 * @param {Object} sender Response from server.
 * @param {JSON} request Casted format of response varibale to the json.
 * @param {string} PHISHING_WARNING_WHITELIST_KEY_
 */
function check_for_whitelist(sender, request){
    let domain = new URL(request.URL);
    domain = domain.hostname;
    console.log(domain + " - domain"); 
    PHISHING_WARNING_WHITELIST_KEY_ = 'phishing_warning_whitelist';
    chrome.storage.local.get(
        PHISHING_WARNING_WHITELIST_KEY_,
        function(result) {
          var phishingWarningWhitelist =
              result[PHISHING_WARNING_WHITELIST_KEY_];
          if (phishingWarningWhitelist != undefined && phishingWarningWhitelist[domain]) {
            console.log("Whitelisted{check_for_whitelist}");
            return;
          }else{
            console.log("Not Whitelisted{check_for_whitelist}");
            check_url(sender, request);
            return;
          }
        });
}