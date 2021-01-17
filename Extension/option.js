/**
 * @fileoverview This run as script for option.html. Show white list in table and allow user to 
 * remove URL from white list. Also this will allow user to switch off the trawler extension.
 * @author hansajithsenarath@gmail.com (Deshitha Hansajith)
 */



document.getElementById('option_head').textContent =
    chrome.i18n.getMessage('option_head');
document.getElementById('shutdown_trawler').textContent =
    chrome.i18n.getMessage('shutdown_trawler');
document.getElementById('table_head').textContent =
    chrome.i18n.getMessage('table_head');



/**
 * Get HTML tags from option.html.
 */
let btnGet = document.querySelector('button');
let myTable = document.querySelector('#table');
 
 


/**
 * This will create table.
 * table type - 
 * URL            | button
 * www.example.com| remove button
 */
function make_table(phishingWarningWhitelist){
    let headers = ['URL', 'Block/Unblock'];
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    let header = document.createElement('th');
    let textNode = document.createTextNode(headers[0]);
    header.appendChild(textNode);
    headerRow.appendChild(header);

 
    table.appendChild(headerRow);
    Object.keys(phishingWarningWhitelist).forEach((url_id, index) => {
      let row = document.createElement('tr');

      let url_cell = document.createElement('td');
      let textNode = document.createTextNode(url_id);
      url_cell.appendChild(textNode);
      row.appendChild(url_cell);

      let button_cell = document.createElement('td');
      let block_button = document.createElement('button');
      block_button.id = url_id;
      block_button.textContent = chrome.i18n.getMessage('block');;
      block_button.addEventListener('click', function(){
        console.log(block_button.id);
        button_callback(block_button.id);
        });
      button_cell.appendChild(block_button);
      row.appendChild(button_cell);

      table.appendChild(row);
    });
 
    myTable.appendChild(table);
}



/**
 * This will get phishing_warning_whitelist from chrome storage.
 * @param {Object} phishingWarningWhitelist
 * {phishing_warning_whitelist:
 *     {https://www.example1.com: true,
 *      https://www.example2.com: true}
 * }
 */
function get_whtelist(){
  PHISHING_WARNING_WHITELIST_KEY_ = 'phishing_warning_whitelist';
  chrome.storage.local.get(
    PHISHING_WARNING_WHITELIST_KEY_,
    function(result) {
      // console.log(typeof(result));
      var phishingWarningWhitelist =
          result[PHISHING_WARNING_WHITELIST_KEY_];
      if (phishingWarningWhitelist != undefined ) {
        document.getElementById('no_content_message').textContent = '';
        make_table(phishingWarningWhitelist);
        return phishingWarningWhitelist;
      }else{
        document.getElementById('no_content_message').textContent = chrome.i18n.getMessage('no_content_message');
        return ;
      }
    });
}




/**
 * This is a callback function for block button.
 */
function button_callback(button_id){
  console.log('button_callback');
  PHISHING_WARNING_WHITELIST_KEY_ = 'phishing_warning_whitelist';
  chrome.storage.local.get(
    PHISHING_WARNING_WHITELIST_KEY_,
    function(result) {
      var phishingWarningWhitelist =
          result[PHISHING_WARNING_WHITELIST_KEY_];
      console.log(phishingWarningWhitelist[button_id]);
      delete phishingWarningWhitelist[button_id];
      console.log(phishingWarningWhitelist[button_id]);
      result[PHISHING_WARNING_WHITELIST_KEY_] = phishingWarningWhitelist;
      chrome.storage.local.set(result);
      location.reload();
    });

}

//functon call for all the script excution.
get_whtelist();
