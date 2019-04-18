// setting the API call
var config = {
    apiKey: "AIzaSyDhQje3TQr2-fYTPmA41k4jvt4TTR5C6zw",
    authDomain: "evgenia-s-project.firebaseapp.com",
    databaseURL: "https://evgenia-s-project.firebaseio.com",
    projectId: "evgenia-s-project",
    storageBucket: "evgenia-s-project.appspot.com",
    messagingSenderId: "908270590424"
};

firebase.initializeApp(config);
function initApp() {
    firebase.auth().onAuthStateChanged(function(user) 
}

// setting Firebase database
var database = firebase.database();

var userSignIn = "/userSignIn";
var userName = "Evgenia";
// database.ref(userSignIn).child(userName).set({
//     userName: "Evgenia",
//     userPassword: "1234Test",
// });
var recipeTitle = "";
var recipeImg = "";
var savedRecipes = "/savedRecipes";
// database.ref(savedRecipes).child("Evgenia").set({
//     recipeTitle = "";
//     recipeImg = ""
// });

// example
// database.ref(userSignIn).child("Lawrence").set({
//     userName: "Lawrence",
//     userPassword: "Test1234",
// });



// database.ref(userSignIn).child("Evgenia").set({
//     userName: "Evgenia",
//     userPassword: "Test1234",
// });


$(document).ready(function () {
    var maxCalories;
    var recipestitleQuery;
    var includeIngredients;
    var caloriesQueryParam;
    var recipesQueryParam;
    var ingredienceQueryParam;

    $("#recipesSearch").val("");
    $("#ingredientsSearch").val("");
    $("#caloriesInput").val("");

    $("#buttonSearch").on("click", function () {
        maxCalories = $("#caloriesInput").val().trim();
        recipestitleQuery = $("#recipesSearch").val().trim();
        includeIngredients = $("#ingredientsSearch").val().trim();

        if (maxCalories !== "") {
            caloriesQueryParam = "&maxCalories=" + maxCalories;
        } else {
            caloriesQueryParam = "2000";
        }
        if (recipestitleQuery !== "") {
            recipesQueryParam = "query=" + recipestitleQuery;
        } else {
            recipesQueryParam = "";
        }
        if (includeIngredients !== "") {
            ingredienceQueryParam = "&includeIngredients=" + includeIngredients;
        } else {
            ingredienceQueryParam = "";
        }

        function display() {
            //  setting an API url
            var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?" + recipesQueryParam + caloriesQueryParam + ingredienceQueryParam;
            console.log(queryURL);


            //Creating an AJAX call 
            $.ajax({
                url: queryURL,
                method: "GET",
                headers: {
                    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    "X-RapidAPI-Key": "0a1b13432cmshb515af5d16ebe56p13fee7jsn5cd90584b6e3",
                }
            }).then(function (response) {
                console.log(response);
                console.log("search results");

                // assume we have recipes to return
                // or loop through 9 images i<10, because the carousel has 9 cards
                for (var i = 0; i < response.results.length; i++) {
                    $(`#carousel${i}`).val("");
                    // var recipeTitle = response.results[i].title;
                    // var imgURL = response.results[i].image;
                    var title = response.results[i].title;
                    var calories = response.results[i].calories;
                    var imgURL = response.results[i].image;
                    // var button = $("<button>")
                    // button.attr("data-name", recipeTitle).attr("src", imgURL).addClass("saveButton").html("Save " + "Recipe")
                    $(`#buttonSave${i}`).attr("src", imgURL);
                    $(`#buttonSave${i}`).attr("Title", title);
                    $(`#buttonSave${i}`).attr("Calories", calories);
                    $(`#buttonSave${i}`).show();

                    // $(`#carousel${i}`).attr("src", imgURL).data(recipeTitle)
                    // $(`#recipe${i}`).append(button)

                    $(`#carousel${i}`).attr("src", imgURL);
                    $(`#foodtitle${i}`).text(title);
                    $(`#calories${i}`).text(calories + " calories");
                }




                // var saveCookie = (document.cookie.split(";").filter(function (item) {
                //     return item.trim().indexOf('recipeName=') == 0
                // }));

            });
        }
        display();
    });

    database.ref("userSignIn/" + userName + "/recipes/").on("child_added", function (snapshot) {
        var snap = snapshot.val();
        console.log(snap)
        var savedImg = snap.recipeImgData
        console.log(savedImg)
        var savedRecipe = snap.recipeTitleData;
        var caloriesData = snap.caloriesData;
        console.log(caloriesData);

        // $(".savedRecipe").prepend(savedRecipe)
        // <div class="card savedRecipe">
        //     <!-- <img src="assets/images/blue.jpg" class="card-img-top" alt="Saved Recipe"> -->
        //                         <div class="card-body">
        //             <p class="card-text">Recipe Name</p>
        //         </div>
        //                     </div>
        var card = $("<div>");
        card.addClass("card savedRecipe");
        var cardImg = $("<img>");
        cardImg.attr("src", savedImg);
        cardImg.addClass("card-img-top");
        cardImg.attr("alt", savedRecipe);
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        cardBody.html(`<p class="card-text">${savedRecipe}</p>`);
        card.append(cardImg);
        card.append(cardBody);
        $("#savedItems").append(card);
    
    })

    $(".saveButton").on("click", function () {
        if (isLoggedIn()) {
            var title = $(this).attr("title");
            var imgURL = $(this).attr("src");
            var calories = $(this).attr("calories");

            console.log("save button");
            database.ref("userSignIn/" + userName + "/recipes/").push({
                recipeTitleData: title,
                recipeImgData: imgURL,
                caloriesData: calories
            });
        }
        else {
            $("#loginModal").modal("show");
        }
        // $("#loginModal").modal("show");
    });

    // Second API call

    function secondAPI() {
        //  setting an API url
        var numberRecipes = "number=10";
        var queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?" + numberRecipes;
        console.log(queryURL2);


        //Creating an AJAX call
        $.ajax({
            url: queryURL2,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "0a1b13432cmshb515af5d16ebe56p13fee7jsn5cd90584b6e3",
            }
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.recipes.length; i++) {
                var readyInMinutes = response.recipes[i].readyInMinutes;
                var titleRandom = response.recipes[i].title;
                var imgURL2 = response.recipes[i].image;
                // var buttonRandom = $("<button>")
                // buttonRandom.attr("data-name", titleRandom).addClass("saveButton").html("Save " + "Recipe")
                console.log(imgURL2);
                $(`#carousel${i}`).attr("src", imgURL2);
                $(`#foodtitle${i}`).text(titleRandom);
                $(`#calories${i}`).text("Ready in " + readyInMinutes + " minutes");


                // $(`#recipe${i}`).append(buttonRandom)
                $(`#buttonSave${i}`).hide();
            }
        });
    }
    secondAPI();


    var nameCookie = (document.cookie.split(";").filter(function (item) {
        return item.trim().indexOf('name=') == 0
    }));

    function isLoggedIn() {
        var Cookie = (document.cookie.split(";").filter(function (item) {
            return item.trim().indexOf('name=') == 0
        }));
        return Cookie.length !== 0;

    }

    if (nameCookie === "") {
        secondAPI();
    }

    if (isLoggedIn()) {
        $("#signInButton").hide();
        $("#helloName").show();
        $("#helloUserName").text(nameCookie[0].trim().substring(5));

    }

    $("#signOut").on("click", function () {
        document.cookie = "name=" + "" + ";expires =" + new Date().toUTCString();
        $("#signInButton").show();
        $("#helloName").hide();
        $("#helloUserName").text("User");
        secondAPI();
    });

    // $("#helloName").on("click", function () {
    //     window.location.href = 

    // })

    // document.cookie = "name=" + "userName" + ";expires =" + new Date().toUTCString();
    $("#submitButtonEmail").on("click", function (event) {
        var userName = $("#exampleInputEmail1").val().trim();
        var userPassword = $("#exampleInputPassword1").val().trim();
        // TODO: put validation
        var user = database.ref(userSignIn);
        var name = user.child(userName);

        name.once("value", function () {
            console.log(name);
            if (!data.exists()) {
                // d
                $("#exampleInputPassword1").val("");
                $("#exampleInputEmail1").val("");
                return;
            }
            console.log(userPassword, data.val().userPassword);

            if (userPassword !== data.val().userPassword) {
                $("#exampleInputPassword1").val("");
            } else {
                $("#loginModal").modal("hide");
                $("#exampleInputPassword1").val("");
                $("#exampleInputEmail1").val("");
            }
            $("#signInButton").hide();
            $("#helloName").show();
            $("#helloUserName").text(userName);

            document.cookie = "name=" + userName + ";expires =" + new Date(moment().add(30, "minutes").toDate());
            console.log(document.cookie);
        });


    });

$(document).ready(function () {
    $(window).scroll(function () {
        $(".card-fill").each(function (i) {
            var bottomOfObject = $(this).offset().top + $(this).outerHeight();
            var bottomOfWindow = $(window).scrollTop() + $(window).height();

            if (bottomOfWindow > bottomOfObject) {
                $(this).animate({ "opacity": "1" }, 2000);
            }
        });
    });
});

$(function () {
    $(".card").draggable({
        // stack: $(this),
        containment: "document",
        revert: "invalid",
        helper: "clone",
        zindex: 100
    });

    $("#breakfastCard, #lunchCard, #dinnerCard").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        // accept: ".card",
        tolerance: 'pointer',
        greedy: true,
        drop: function (ev, ui) {
            $(this).empty();
            $(ui.draggable).clone(true).detach().css({
                position: 'relative',
                top: 'auto',
                left: 'auto'
            }).appendTo(this);
        }
    });
})
//
//
// MAPS API
var map;
var service;
var infowindow;

function initMap() {
    var seattle = new google.maps.LatLng(47.6062, -122.335167);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), { center: seattle, zoom: 15 });

    var request = {
        location: seattle,
        // radius: '500',
        query: 'food'
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


        // var map;
        // var service;
        // var infowindow;

// function initialize() {
//   var pyrmont = new google.maps.LatLng(47.6062, -122.335167);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['restaurant']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
