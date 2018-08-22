/**
 * This is the meat and potatoes of the editing experience.
 */
class Editor {
    constructor(events, overlay) {
        this.events = events;
        this.overlay = overlay;
        let ui = this.ui = create('textarea', this.getDefaultString());
        ui.id = 'pagemix-editor';
        ui.editor = this;
        // codemirror configuration
        this.cmConfig = {
            mode: "htmlmixed", // relies on xml, css, javascript
            lineNumbers: true,
            lineWrapping: true
        };
    }

    // utility function
    getDefaultString() {
        return `
Mouse over any part of the page to see how much content it really covers,
click any highlighted portion to see what the HTML code looks like...
...and then change it!
        `.trim();
    }

    /**
     * Update the part of the page currently loaded into the editor to
     * reflect the edits made in the editor.
     *
     * @param {newContent} The content to write back into the page
     */
    update(newContent) {
        let e = this._related_element;
        let div = create('div', newContent);
        let replacement = div.children[0];
        e.parentNode.replaceChild(replacement, e);
        this._related_element = replacement;
    }

    /**
     * Ensure that the editor knows which DOM tree corresponds to the
     * data that it's presenting to the user for inspecting and editing.
     *
     * @param {e} The DOM element whose code is to be displayed in the editor.
     */
    setRelatedElement(e) {
        if (this.codemirror) {
            this.codemirror.toTextArea();
        }

        this._related_element = e;
        this.ui.value = cleanupHTML(e.outerHTML);

        let d = this.ui.getBoundingClientRect(),
            h = d.height,
            w = d.width;

        let codemirror = this.codemirror = CodeMirror.fromTextArea(this.ui, this.cmConfig);

        codemirror.setSize(w, h);

        codemirror.on("change", e => {
            let data = codemirror.getValue();
            this.update(data);
        });
    }

    /**
     * Tell the editor that it is no longer tied to a specific DOM element.
     */
    unsetRelatedElement() {
        if (this.codemirror) {
            this.codemirror.toTextArea();
        }

        this.ui.value = this.getDefaultString();
        let e = this._related_element;
        this._related_element = undefined;
        return e;
    }

    // fall-through to CodeMirror
    undo() { this.codemirror.undo(); }

    // fall-through to CodeMirror
    redo() { this.codemirror.redo(); }
}
