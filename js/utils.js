var getUrlFromVars = function() {
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');
        if (hash[0] === 'url') {
            return hash[1];
        }
    }
    return undefined;
};