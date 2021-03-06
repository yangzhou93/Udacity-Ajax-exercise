
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var $street = $('#street').val();
    var $city = $('#city').val();
    var address = $street + ', ' + $city;
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    $body.append('<img class = bgimg src = "' + url + '">');

    // $.getJSON('....' + $city + '....', function(data){
    //   var articles = data.response.docs;
    //   $.each(articles,function(article){
    //     $nytElem.append('<li class = "article"><a href =' + article.web_url
    //      + '>' + article.headline.main + '</a><p>' + article.snippet + '</p></li>';)
    //   })
    // }).error(function(){
    //   $nytElem.append('<p>Error!</p>');
    // })
    var wikiTimeout = setTimeout(function(){
      $('#wikipedia-header').text('timeout');
    },4000);


    $.ajax('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city +
    '&format=json&callback=wikiCallback',{
      dataType: 'jsonp',
      success: function(response){
        var articles = response[1];
        var urls = response[3];
        for (var i = 0; i < articles.length; i ++){
          var article = articles[i];
          var url = urls[i];
          $wikiElem.append('<li><a href ="' + url + '">' + article + '</a></li>');
        }
        clearTimeout(wikiTimeout);
      }
    })
    return false;
};

$('#form-container').submit(loadData);
