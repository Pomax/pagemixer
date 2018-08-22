let find = (a,b) => b ? b.querySelector(a) : document.querySelector(a);

let create = (a,b,c) => {
    let e = document.createElement(a,c);
    if (b) e.innerHTML = b;
    return e;
}

let remove =  e => e ? e.parentNode.removeChild(e) : false;

function hasParent(e, p) {
    if (!p) return;
    while (e && e !== document.body) {
        if (e === p ) return true;
        e = e.parentNode;
    }
}

function debug() {
    console.log.apply(console, arguments);
}
