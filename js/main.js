(function(){
  
  var defaultInputText = "Enter shorten address to expand";
  var searchingInputText = "Searching ...";
  
  $(".header_search_input").on("keypress", function(e) {
    var code = e.keyCode || e.which;
    if(code === 13) {
      $(".header_search_button").trigger("click");
    }
  });  
  
  $(".header_search_button").on("click", function(e) {        
    var searchInput = $(".header_search_input");
    var shortUrl = searchInput.val().trim();
    searchInput.val('');
    searchInput.attr("placeholder", searchingInputText);
    
    var urlRequest = "http://plottsocialist.azurewebsites.net/api/Plott/Fetch?url=" + shortUrl;
    
    $.ajax({
      url: urlRequest,
      method: "GET"      
    })
    .done(function(data) {      
      console.log(data);
      
      searchInput.attr("placeholder", defaultInputText);      
      var li = $(document.createElement('li')).addClass('results_list_item');
      var shortLink, longLink, errorLink;
      
      shortLink = $(document.createElement('a')).addClass('results_list_item_shorten');
      shortLink.attr('href', data.ShortUrl);
      shortLink.text(data.ShortUrl);
      
      longLink = $(document.createElement('a')).addClass('results_list_item_full');
      errorLink = $(document.createElement('a')).addClass('results_list_item_error');
      
      if(data.Error === "") {        
        longLink.text(data.LongUrl);
        longLink.attr('href', data.LongUrl);        
        $(li).append(longLink, shortLink);
        $(".results_list").prepend(li);        
      }
      else {        
        errorLink.text(data.Error);
        errorLink.attr('href', '#Error');        
        $(li).append(errorLink, shortLink);
        $(".results_list").prepend(li);
      }
    })
    .fail(function(){
      searchInput.attr("placeholder", defaultInputText)
      console.log("An error has ocurred, please try again later.");
    })
    
    e.preventDefault();
  });
})()
