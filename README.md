# Page Mixer

A web extension that works a little like a very simple in-browser dev tools, for normal people to play with.

## How to run this web extension

For local testing and development, or if you just want to non-comittally play around with the extension, [install web-ext](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext) and then just run `> web-ext run` in the root dir.

To install the extension as a normal add-on, please visit https://addons.mozilla.org/en-US/firefox/addon/page-mixer/

## How does it work?

Press the Page Mixer button in your button bar to activate the page mixer.

When active, the page mixer monitors mousemove, to find out which element the cursor is over. It then draws an inactive transparent div using the same bounding rect as that element. Clicks are then intercepted and make the mixer load the element's `outerHTML` into the main UI textarea, and then wraps it in a [CodeMirror](https://codemirror.net/) with html/css/js syntax highlighting turned on.

- `parent` selects the currently loaded element's parent tree
- `delete` deletes the currently loaded element from the page. This cannot be undone!
- `undo`/`redo` are managed by CodeMirror, and reset whenever you pick a new element.
- `help` shows you, basically, this command listing.
- `save` saves the current DOM tree as an .html file to your computer (that's right. Your computer. You get to save what you did).
- `publish` saves the your remix to github. This requires a little work on your part, [see the instructions below](#publishing-to-github).
- `quit` does the obvious thing, and can also be triggered by preessing 'x' which not in the text editing part of the UI.

## If you can see code: edit the code!

Edits to the code are immediately reflected on the page itself by grabbing the code from CodeMirror and simply injecting it back into the page by replacing the HTML tree you were editing with a new tree based on the code from CodeMirror.

**note** this does _not_ check for correctness so if you mess up the code in CodeMirror, the page'll probably look weird until you fix it. And there are no slowparse-style hints at the moment. CodeMirror _is_ set up to do hinting though, so if you mess up you should get some colourful hints that something is awry.

## Publishing to github

In order to publish your remixes to github, you need a few things:

- a github account, which you can create over on https://github.com if you don't have one already.
- a repository called "webpage-remixes" (without the quotes), which you can make over on https://github.com/new if you don't have one already.
- a file in that repository called ".nojekyll" (without the quotes, and it should be an empty file), which you can make over on https://github.com/YOUR-USERNAME-HERE/webpage-remixes/new/master (obviously with "YOUR-USERNAME-HERE" replaced with your username =)
- setting the "master" branch as your web branch, which you can do by going to https://github.com/YOUR-USERNAME-HERE/webpage-remixes/settings and then under "GitHub Pages", setting the "source" to your master branch.
- a personal API token for github, which you can create over on https://github.com/settings/tokens if you don't have one already (we just need `public_repo` checkmarked, nothing else)

When you want to publish, the extension will ask you for your github username and that access token. Paste them in and then wait for the prompt that tells you what your published remix URL is.

**note**: that access token is a key to content on your github account. Do not store it anywhere that the internet can get to, or can see it, or can use in any way. This extension does not currently save your github username and access token because that would be an incredibly stupid thing to do: no one but you should know that access token. In order to store your access token we would need web extensions to have access to some kind of encrypted storage, and they don't. Use a password manager like [lastpass](https://www.lastpass.com/), or [1password](https://1password.com/), or [passpack](https://www.passpack.com/).

## screens

### The intro screen

This is the view you'll get when you start up the page mixer.

![screenshot 594](https://user-images.githubusercontent.com/177243/44127196-1803014a-9ff1-11e8-95ba-409cf64b57ab.png)

### While examining page content

When you click on a part of the page, the page code for that part will show up in a text editor, with some nice colours to show you which parts of plain text, and which are code.

![screenshot 595](https://user-images.githubusercontent.com/177243/44127197-1a02bcba-9ff1-11e8-8cf7-11fb72aeb314.png)

### Saving the file to your computer

When you click "save" you'll get a little dialog that is the same as the one you'd see if you downloaded any other file with your browser.

![screenshot 596](https://user-images.githubusercontent.com/177243/44127201-1b398348-9ff1-11e8-8d7d-ebe27e92d3f8.png)

### Publishing your remix

When you hit "publish" you'll have to click through a few dialogs right now. But with perseverance you will be rewarded with the notice that your remix got published to your github repository, with the URL for your remix listed as text that you can copy and then share with your friends, colleagues, family, or maybe even a particularly web-savvy pet.

![screenshot 597](https://user-images.githubusercontent.com/177243/44127203-1c71510a-9ff1-11e8-8353-71d61d64b5be.png)

### Remixes won't always look good

Webpages can link out to all kinds of third party styling and functionality, and right now the Page Mixer isn't anywhere near smart enough to make sure that even just all the styling is captured "as it is when you hit publish". The HTML code will be correct, but correct on the web does not always mean "the same as the original" thanks to things like [cross origin request blocking](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), [mixed content blocking](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content), and [content security policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

![screenshot 598](https://user-images.githubusercontent.com/177243/44127205-1efafdd6-9ff1-11e8-87c0-24707a53d8b0.png)

### But your remix will be available on github

Whether things look right or not, you'll now have a copy of your remix saved into your github repository, for you do with as you please.

![screenshot 599](https://user-images.githubusercontent.com/177243/44127206-200b4cda-9ff1-11e8-929c-e54885a064d8.png)


