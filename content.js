const msg = window.location.toString()
chrome.runtime.sendMessage({ message: msg }, function(response) {
    console.log(response.message);
    warning(response);
    
});

function warning(response){
    console.log(response.message);
}