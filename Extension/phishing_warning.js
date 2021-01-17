/**
 * @fileoverview This will close tab, add URL to white list, go to back with user choice that he clicked on buttons
 * appering on phishing_warning.html.
 * @author hansajithsenarath@gmail.com (Deshitha Hansajith)
 */








/**
 * URI encoded parameters from the URL.
 * [phishingTabId, url, securityEmailAddress]
 */
var parameters = window.location.search.substr(1).split('&');
var phishingTabId = parseInt(parameters[0]);
var url = decodeURIComponent(parameters[1]);
console.log("url");



/**
 * Set content in phishing_warning.html with language of web browser.
 * en - English
 * si - Sinhala(Sri Lanka)
 */
document.getElementById('warning_banner_header').textContent =
    chrome.i18n.getMessage('phishing_warning_banner_header');
document.getElementById('warning_banner_text').textContent =
    chrome.i18n.getMessage('phishing_warning_banner_body');
document.getElementById('learn_more').textContent =
    chrome.i18n.getMessage('learn_more');

document.getElementById('close_this_tab').textContent =
    chrome.i18n.getMessage('close_this_tab');
document.getElementById('back').textContent =
    chrome.i18n.getMessage('back');
document.getElementById('visit_this_site').textContent =
    chrome.i18n.getMessage('visit_this_site');




/**
 * This close the phishing_warning.html tab on clicked #close_this_tab button.
 */
document.getElementById('close_this_tab').onclick = function() {
  chrome.tabs.remove(phishingTabId);
};




/**
 * This redirect tab to previous URL or if not previous URL close the tab on clicked #back button.
 */
document.getElementById('back').onclick = function() {
  chrome.tabs.get(phishingTabId, function(tab) {
    chrome.tabs.highlight({'tabs': tab.index}, function() {
      // When the phishing site gets opened in a new tab.
      if (window.history.length <= 2) {
        window.close();
        return;
      }
      window.history.go(-2);
    });
  });
};

/**
 * Key for the phishing warning whitelist object in chrome storage.
 * @private {string}
 * @const
 */
PHISHING_WARNING_WHITELIST_KEY_ = 'phishing_warning_whitelist';

/**
 * If a user decides to visit the site, the site will be whitelisted from
 * future phishing warnings.  The saved object in chrome storage has the
 * below structure. The top-level key is used as the argument for
 * StorageArea get(), and the associated value will be an inner object that
 * has all the host details.
 *
 * {phishing_warning_whitelist:
 *     {https://www.example1.com: true,
 *      https://www.example2.com: true}
 * }
 */

document.getElementById('visit_this_site').onclick = function() {
  chrome.tabs.get(phishingTabId, function(tab) {
    chrome.tabs.highlight({'tabs': tab.index}, function() {});
    chrome.storage.local.get(
        PHISHING_WARNING_WHITELIST_KEY_,
        function(result) {
          if (result[PHISHING_WARNING_WHITELIST_KEY_] === undefined) {
            result[PHISHING_WARNING_WHITELIST_KEY_] = {};
          }
          // console.log(url);
          result[PHISHING_WARNING_WHITELIST_KEY_][url] = true;
          chrome.storage.local.set(result);
          window.history.back();
        });
  });
};