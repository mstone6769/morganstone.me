window.ga = function () { ga.q.push(arguments) };
ga.q = [];
ga.l = +new Date;
ga('create', 'UA-1337770-1', 'auto');
ga('set','transport','beacon');
ga('send', 'pageview');
var captureOutboundLink = function(url) {
  ga('send', 'event', 'outbound', 'click', url, {
    'transport': 'beacon',
    'hitCallback': function(){document.location = url;}
  });
}

var captureSocialOutboundLink = function(social, url) {
  ga('send', 'event', 'social', 'click', social, {
    'transport': 'beacon',
    'hitCallback': function(){document.location = url;}
  });
}

var captureMailTo = function(email) {
  ga('send', 'event', 'mailto', 'click', email);
  return true;
}