var butTopics = ["motorcycles", "supermoto", "wrc", "panda", "chimpanzee", "PnR", "southpark", "rocketleague", "sloths", "doot", "baby-groot"];



function initButtons(){
  $("#buttons").html("");
  for(i in butTopics){
    $("#buttons").append("<button class='btn btn-warning button' value=" + String(butTopics[i]) + ">" + String(butTopics[i]) + "</button>");
  }
  return
}

function initGifs(term){
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=yE0rc2A4l8CT4gQ9yZEDstkFonFyXHOw&q=" + term + "&limit=10&offset=0&rating=PG-13&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);

    $("#main").html("");

    var result = response.data;

    for(i in result){
      console.log(result[i]);
      $("#main").append("<div class='poster'><img class='gif' state='still' data-animate=" + String(result[i].images.fixed_height.url) + " data-still=" + String(result[i].images.fixed_height_still.url) + " src=" + String(result[i].images.fixed_height_still.url) + "><br><h3>" + result[i].rating + "</h3></div>");
    }

    $(".gif").click(function() {
      console.log("clicked");

      var gif = $(this);

      switchGif(gif);

    });
  });
}

function switchGif(gif){
  console.log("clicked");

  var state = gif.attr("state")

  if(state === 'still'){
    gif.attr("src", gif.attr("data-animate"));
    gif.attr("state", "animate");
  }

  else if(state === 'animate'){
    gif.attr("src", gif.attr("data-still"));
    gif.attr("state", "still");
  }
}

$( document ).ready(function(){
  initButtons();

  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    if($("#topic-input").val().trim() !== ""){
      butTopics.push($("#topic-input").val().trim());
    }
    initButtons(); 
    return
  });


  $("#buttons").on("click", ".button", function() {
    console.log($(this).attr("value"));
    var term = $(this).attr("value");
    initGifs(term);
  });

    
  $(".gif").on("click", function() {
    console.log("clicked");

    var gif = $(this);

    switchGif(gif);
  });
});
