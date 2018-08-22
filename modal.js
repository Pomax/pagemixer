/**
 * A modal dialog builder, for some simple on-page modals.
 * @param {content} The HTML string content for the modal.
 */
function createModal(content) {
    var underlay = create('div');
    underlay.id = `pagemix-modal-underlay`;
    var dialog = create('div', content);
    dialog.id = 'pagemix-modal';
    underlay.appendChild(dialog);
    return underlay;
}
