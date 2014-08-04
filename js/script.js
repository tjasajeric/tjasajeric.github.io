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

    var pages = [];
    var loadedPage = 1;
    var LOAD_MORE = 5;

    $.getJSON('https://api.github.com/repos/tjasajeric/' + repoPath + '/contents/images/').done(function(data) {
      $.each( data, function( key, value ) {
        if (filterRegex.test(value['name'])) {
            pages.push(value['html_url'].replace('/blob/', '/raw/'));
        }
      });

      if (pages.length === 0) {
        openDefault();
      }

      $mag.turn({pages: 1});
      $(window).trigger('resize');
    }).fail(function() {
        openDefault();
    });

    $mag.bind('turning', function(e, page) {
        while(loadedPage <= Math.min(page + LOAD_MORE, pages.length)) {
            $mag.turn('addPage', $('<div style="background-image:url(' + pages[loadedPage-1] + '); background-size:100% 100%;" />'), loadedPage);
            loadedPage++;
        }
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
