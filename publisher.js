/**
 * This class knows how to push files to github, in
 * an extremely narrow fashion: it knows exactly enough
 * to push single files to the master branch of someone's
 * "webpage-remixes" repository, and that's pretty much it.
 */
class Publisher {
    constructor(events) {
        this.events = events;
        this.username = '';
        this.accesstoken = '';
    }

    generatePrePublishDialog(continueWithPublishing) {
        let modal = createModal(`
<h3>Publish your web page</h3>
<p>In order to publish to github we'll need to know your username,
and your github access token. These will NOT be stored anywhere. If
you don't have a github account yet, or a repository called
<strong>webpage-remixes</strong> or haven't set its master branch to be
the default web branch, or you've done all those things but you've not
set up a personal API token yet, please head on over to <a href="https://github.com/pomax/pagemixer#publishing-to-github">https://github.com/pomax/pagemixer#publishing-to-github</a> and
follow the instructions.<p>

<p>Assuming you've done all those things:</p>

<div>
  <label>
    What's your github username?
    <input type="text" id="pagemix-user-name">
  </label>
  <label>
    What is your github access token?
    <input type="password" id="pagemix-access-token">
  </label>
  <div class="buttons">
    <button id="pagemix-save-credentials">Publish!</button>
    <button id="pagemix-cancel-publish">Actually, cancel</button>
  </div>
</div>`);
        document.body.appendChild(modal);
        find('#pagemix-user-name').focus();

        let save = find('#pagemix-save-credentials');
        this.events.listen(save, "click", e => {
            this.username = find('#pagemix-user-name').value;
            this.accesstoken = find('#pagemix-access-token').value;
            if (!this.username && !this.accesstoken) {
                alert('please fill in your username and access token');
            }
            else if (!this.username) {
                alert('Please fill in your github username')
            }
            else if (!this.accesstoken) {
                alert('Please fill in your github access token')
            }
            else {
                remove(modal);
                continueWithPublishing();
            }
        });

        let cancel = find('#pagemix-cancel-publish');
        this.events.listen(cancel, "click", e => {
            remove(modal);
        });
    }

    /**
     * Publish a single file to someone's "webpage-remixes" repository,
     * specifally into their "master" branch.
     * @param {filename} The name of the file to commit to the repo
     * @param {data} The file content to commit to the repo, for that file
     */
    publish(filename, data) {
        // I'm not storing these until someone lets me know of a local secure store that web extensions can use.
        if (!this.username || !this.accesstoken) {
            return this.generatePrePublishDialog( () => {
                this.publish(filename, data);
            });
        }

        // Note: we use the access token as query arg rather than using an "Authorization" header because
        // if someone can see one, they can see the other, and both methods work equally well.
        // As such, with all else being equal, I will pick the easier to read, easier to write option every time.
        var url = `https://api.github.com/repos/${this.username}/webpage-remixes/contents/${filename}?access_token=${this.accesstoken}`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                path: filename,
                message: `remix of ${window.location}, ${Date.now()}`,
                content: Base64.encode(data)
            })
        })
        .then(result => {
            // This step is not strictly speaking necessary, but it lets us
            // debug easier in the next then() handler if necessary.
            return result.json();
        })
        .then(js => {
            if (js.message && js.message === 'Bad credentials') {
                this.username = '';
                this.accesstoken = '';
                throw new Error('That username and/or access token was incorrect, please try again or cancel.');
            }

            let remixURL = `https://${this.username}.github.io/webpage-remixes/${filename}`;
            let modal = createModal(`
<h3>Your remix was published!</h3>
<p>Please follow or copy the following URL:</p>
<p><a href="${remixURL}" target="_blank">${remixURL}</a></p>
<p>Note that it might take a minute for the URL to become active, depending on how long Github needs to synchronize your branch with its web hosting platform.</p>
<div class="buttons"><button>Got it</button></div>
`);

            var close = find('button', modal);
            this.events.listen(close, "click", e => {
                remove(modal);
            });

            document.body.appendChild(modal);
        })
        .catch(e => {
            alert(e);
            this.publish(filename, data);
        });
    }
}
