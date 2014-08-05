(function($) {
    'use strict';

    var openDefault = function() {
        window.location = 'https://github.com/tjasajeric';
    };

    var repoPath = getUrlFromVars('repo');
    if (repoPath === undefined) {
        openDefault();
    }
    document.title = repoPath;

    var filterRegex = /\.(png|jpg|jpeg)$/;

    var $mag = $('#magazine');

    var loadedPage = 1;
    var LOAD_MORE = 5;

    $.getJSON('https://api.github.com/repos/tjasajeric/' + repoPath + '/contents/images/').done(function(data) {
      var hasPage = false;
      $.each( data, function( key, value ) {
        if (filterRegex.test(value['name'])) {
            hasPage = true;
            $mag.append($('<div style="background-image:url(' + value['html_url'].replace('/blob/', '/raw/') + '); background-size:100% 100%;" />'));
        }
      });

      if (!hasPage) {
        openDefault();
      }

      $mag.turn();
      $(window).trigger('resize');
    }).fail(function() {
        openDefault();
    });

    $(window).resize(function() {
        var curH = $(window).height();
        var curW = $(window).width();
        if (curH < curW/2) {
            $mag.turn('size', curH*2-100, curH-50);
        } else {
            $mag.turn('size', curW-100, curW/2-50);
        }
    });

    $(document).on('keydown', function(e) {
        if (e.keyCode==37) {
            $mag.turn('previous');
        }
        else if (e.keyCode==39) {
            $mag.turn('next');
        }
    });
})(jQuery);
