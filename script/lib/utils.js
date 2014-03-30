/* UTILS 
 * author http://google.com/+BillRocha
 * date:  2014/03/12
 */

//getElementById.
function _(e) {
    return document.getElementById(e);
}

/* create new element
 * n: type name (DIV, SPAN ...)
 * a: attribute(s) ('id' is defalt | object: {'id':'thisId', 'class':'className', ...}
 * c: content - an other element or an string HTML
 */
function _e(n, a, c) {
    var t = document.createElement(n);

    //content
    if (typeof c != 'boolean') {
        if (typeof c == 'string') t.innerHTML = c;
        if (typeof c == 'object') _ap(t, c);
    }

    //attributes
    if (typeof a == 'string') _a(t, 'id', a);
    if (typeof a == 'object') {
        for (i in a) _a(t, i, a[i])
    }
    return t;
}

/* Create Attribute for a element
 * e: target element
 * a: attribute name
 * v: value for attribute
 */
function _a(e, a, v) {
    var t = document.createAttribute(a);
    t.value = v;
    return e.setAttributeNode(t);
}

/* Append element
 * f: father element
 * c: child element
 *
 * ex.: _ap(_('myDiv'),'otherElementById');
 * ex,: _ap('myDiv') >> appen 'myDiv' on body
 */
function _ap(f, c) {
    if (typeof f != 'object') f = _(f);

    if (typeof c != 'undefined') {
        if (typeof c != 'object') c = _(c);
        return f.appendChild(c);
    }
    document.body.appendChild(f);
}

/**
 * Dump DEBUG
 */
function _dbug(e, sub) {
    if (!sub) sub = 0;
    if (sub > 3) return '<-o->';

    var tab = '';
    for (i = 0; i <= sub; i++) {
        tab += '\t';
    }

    var out = '<pre>';
    for (i in e) {
        if (typeof e[i] == 'object') {
            out += '\n' + tab + i + ' : ' + _dbug(e[i], (sub + 1));
        } else {
            out += '\n' + tab + i + ' : ' + e[i];
        }
    }
    return out + '</pre>';
}