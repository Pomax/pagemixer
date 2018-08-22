class HelpMenu {
    constructor(events) {
        let modal = createModal(`
<dl>
  <dt>parent</dt>
  <dd>Select the "parent" element for the part of the page you're looking at.</dd>

  <dt>delete</dt>
  <dd>Once you have clicked a page element, this button will remove that part of the page. This cannot be undone!</dd>

  <dt>undo</dt>
  <dd>While editing an element in the text editor, you can use this button to undo changes you made. Note that if you change elements, the undo resets!</dd>

  <dt>redo</dt>
  <dd>You can redo things that you undid, because that's just convenient.</dd>

  <dt>help</dt>
  <dd>This menu!</dd>

  <dt>save</dt>
  <dd>This lets you save the page as you've edited it to your computer</dd>

  <dt>publish</dt>
  <dd>This lets you publis your page to Github instead of saving it to your computer.</dd>

  <dt>quit</dt>
  <dd>We all know what this does...</dd>
</dl>
<div class="buttons"><button>Got it</button></div>
        `);
        document.body.appendChild(modal);

        let close = find('button', modal);
        events.listen(close, "click", e => {
            remove(modal);
        });
    }
}
