var currentSearch;
var apiKey = "&api_key=KC2URc4m6dX6cSEp1G3hlItyPX612BZS&limit=50";
var queryURL = "http://api.giphy.com/v1/gifs/search?q="
var limit;
var sessionBtns;
var defaultBtns = ["deadpool", "Ozzy", "neko"]

var makeReq = function(queryURL, limit) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(giphy) {
        for(var j=0; j < limit; j++) {
            var gifSrc = giphy.data[j].images.downsized.url;
            gif = $("<img src=" + gifSrc + ">");
            $("#display-gifs").append(gif)
        }
        console.log(queryURL);
    });
}

var renderBtns = function() {
    $("#added-btns").empty();

    sessionBtns = JSON.parse(sessionStorage.getItem("sessionBtns"));
    if (!Array.isArray(sessionBtns)) {
        sessionBtns = [];
      }
    
    for(var i=0; i < sessionBtns.length; i++) {
        makeReq(queryURL+sessionBtns[i]+apiKey);
        var clientBtn = $("<button class='btn addedBtn m-1' data-name=" + sessionBtns[i] + ">" + sessionBtns[i] + "</button>");
        $("#added-btns").append(clientBtn);
    }

    for(var d=0; d < defaultBtns.length; d++) {
        var defaultBtn = $("<button class='btn addedBtn m-1' data-name=" + defaultBtns[d] + ">" + defaultBtns[d] + "</button>");
        $("#default-btns").append(defaultBtn);
    }
}

$("#submitBtn").on("click", function() {
    Currentsearch = $("#user-search").val().trim();
    sessionBtns.push(Currentsearch);
    sessionStorage.setItem("sessionBtns", JSON.stringify( sessionBtns));
    var addedBtn = $("<button class='btn addedBtn' data-name=" + Currentsearch + ">" + Currentsearch + "</button>")
    $("#added-btns").append(addedBtn);
    makeReq(queryURL+Currentsearch+apiKey,1);
});

$(document).on("click",".addedBtn", function() {
    var name = $(this).data('name');
    makeReq(queryURL+name+apiKey, 1);
})

renderBtns();