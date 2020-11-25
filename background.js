chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    var url = request;
    console.log(sender.tab.id);
    var warning_url = chrome.extension.getURL('phishing_warning.html') +
        '?' + sender.tab.id +
        '&' + encodeURIComponent(request.url || '');
    
    state = checkUrl(url.message, warning_url, sender);
    let msg = String(state);
    // chrome.tabs.update({'url': warning_url});
    setTimeout(() => {  
        console.log("add listner");
        sendResponse({ message: msg });
    }, 2000);   
});

async function checkUrl(urlToSend, warning_url,sender) {
    try{
    let server_response = await fetch("http://127.0.0.1:5000/", {    
        // Adding method type 
        method: "POST",      
        // Adding body or contents to send 
        body: JSON.stringify({ 
            url : urlToSend
        }),      
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    var respns = await server_response.json();
    }catch(e) {
        console.log(e);
    }

    console.log(typeof(respns.state));
    if(respns.state == 1){
        let message = "1";
        console.log("checkurl if");
        console.log(sender.tab.id);
        chrome.tabs.update({'url': warning_url});
        return "1";
    }else{
        let message = "0";
        console.log("checckurl else");
        return "0";
    }
    // console.log(typeof(message));
    // return message;
}