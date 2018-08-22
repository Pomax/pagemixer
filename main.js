/**
 * The only thing the background process does is make
 * sure the UI button for this addon turns on the
 * page mixer when clicked.
 */
browser.browserAction.onClicked.addListener(e => {
    browser.tabs.executeScript({
        code: `new PageMixer().start();`
    });
});
