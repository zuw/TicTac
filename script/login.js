/* LOGIN
 * author http://google.com/+BillRocha
 * date:  2014/03/08
 *
 * namespace Login
 */

function help() {

    if (_('help').style.left == '0px') {
        _('help').style.left = '-350px';
        return false;
    }

    //Listener CLICK for Hide
    _('help').addEventListener('click', function (e) {
        _('help').style.left = '-350px';
    }, false);

    //Show
    _('help').style.left = 0;

    return false;
}