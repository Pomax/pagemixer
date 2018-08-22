/**
 * A simple class that automatically keeps a list of
 * all event listeners set up, with a single function
 * that drops all of them in the proper way again.
 *
 * No need to bake in event listener memory leaks.
 *
 */
class Listening {
    constructor() {
        this.listeners = [];
    }

    /**
     * Chronicle the event's core properties and then/ bind it the normal way.
     *
     * @param {e} the element that needs to do the listening
     * @param {evtname} the even name that should be listened for
     * @param {fn} the event handling function to bind
     */
    listen(e, evtname, fn) {
        this.listeners.push({ e, evtname, fn});
        e.addEventListener(evtname, fn, true);
    }

    /**
     * Iterate through all recorded listener bindings and unregister them
     * with the exact same references as were used to register them.
     */
    dropListeners() {
        let items = this.listeners;
        while(items.length) {
            let item = items.pop();
            item.e.removeEventListener(item.evtname, item.fn, true);
        }
    }
}
