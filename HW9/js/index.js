$(document).ready(function(){
  $.ajax(
    {
      type: 'GET',
      url: 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes',

      success: function(response)
      {
        document.getElementById('title').innerHTML = response['name'];
        document.getElementById('type').innerHTML = 'Type: ' + response['type'];
        document.getElementById('language').innerHTML = 'Language: ' + response['language'];
        document.getElementById('genres').innerHTML = 'Genres: <br>'
        for (genre in response['genres']) {
            document.getElementById('genres').innerHTML += '&emsp;' + response['genres'][genre] + '<br>';
        }
        document.getElementById('link').innerHTML = "<a href='" + response['officialSite'] + "'><h4>Official Site</h4></a>";
        document.getElementById('img').innerHTML = "<img src='" + convertHTTPtoHTTPS(response['image']['medium']) + "'>";
        document.getElementById('summary').innerHTML = response['summary'];

        div = document.getElementById('episodes-content');
        data = ''
        eps = response['_embedded']['episodes']
        for (ep in response['_embedded']['episodes']) {
            console.log('ep = ' + ep + ' image = ' + eps[ep]['image']);
            data += '<h3> S' + eps[ep]['season'] + ' Ep' + eps[ep]['number'] + ': ' + eps[ep]['name'] + '</h3><br>' +
                          'Aired: ' + eps[ep]['airdate'] + '<br>';
            data += "<img id='" + eps[ep]['season'] + eps[ep]['number'] + "' src='";
            if (eps[ep]['image'] != null) {
                data += convertHTTPtoHTTPS(eps[ep]['image']['medium']) + "' style='width:auto;'>";
            } else {
                data += "' style='width:auto;'>";
            }
            data += "<br>" + eps[ep]['summary'] + "<br><hr>";
        }
        div.innerHTML = data;
      },

      failure: function()
      {
        alert("AJAX FAILED!");
      }
    }
  );
});

function convertHTTPtoHTTPS(url) {
    original = url;
    url = url.split('/');
    url[0] = url[0].split(':');
    if (url[0][0].toLowerCase() == 'https') {
        return original;
    }
    url[0][0] = 'https';
    url[0] = url[0].join(':');
    url = url.join('/');
    return url;
}

(function($){
    $.fn.swapImg = function() {
        src = this.attr("src");
        id = this.attr("id");
        src = src.split('/')
        if (id != undefined && src[5] == 'original_untouched') {
            src[5] = 'medium_landscape';
        } else if (id != undefined && src[5] == 'medium_landscape') {
            src[5] = 'original_untouched';
        } else if (src[5] == 'original_untouched') {
            src[5] = 'medium_portrait';
        } else if (src[5] == 'medium_portrait') {
            src[5] = 'original_untouched';
        }
        src = src.join('/')
        this.attr("src", src)
        return this;
    };
}(jQuery));

$(function () {
    // $('img').click(function(){
    //     $('img[clicked=true]').fadeOut("slow");
    // })
    $('body').on('click','img',function(){
        $(this).fadeOut().swapImg().fadeIn();
    })
});
