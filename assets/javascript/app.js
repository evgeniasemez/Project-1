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
// setting Firebase database
var database = firebase.database();

var userSignIn = "/userSignIn";
database.ref(userSignIn).child("Evgenia").set({
    userName: "Evgenia",
    userPassword: "Test1234",
});
// });
// Step 2: check database. 
// Step 3: if they are - return the users name, change sign in button to users name. Load users data.
//  Step 4: if not - empty inputs.





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
        }
        else {
            caloriesQueryParam = "";
        }
        if (recipestitleQuery !== "") {
            recipesQueryParam = "query=" + recipestitleQuery;
        }
        else {
            recipesQueryParam = "";
        }
        if (includeIngredients !== "") {
            ingredienceQueryParam = "&includeIngredients=" + includeIngredients;
        }
        else {
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
                // 1. clear all the carousel
                // 2. looking how many images we have
                // 3. put the images in the slideshow
                // 4. i always want at least 10 images, if  i don't have 10 results, i want to keep some the previous going with the new ones
                // if i get more than 10 - i want to add them 

                // assume we have recipes to return
                // or loop through 9 images i<10, because the carousel has 9 cards
                for (var i = 0; i < response.results.length; i++) {
                    $(`#carousel${i}`).val("");
                    // var title = response.results[i].title;
                    var imgURL = response.results[i].image;
                    $(`#carousel${i}`).attr("src", imgURL);


                }

                // second way of doing a carousel 
                // $("#firstCarousel").empty();
                // $("#recipesSearch").val("");
                // $("#ingredientsSearch").val("");
                // $("#caloriesInput").val("");
                // for (var i = 0; i < response.results.length; i++) {
                //     // $(`#carousel${i}`).val("");
                //     // // var title = response.results[i].title;
                //     var imgURL = response.results[i].image;
                //     console.log(imgURL);
                //     // $(`#carousel${i}`).attr("src", imgURL);
                //     // if this the first thing in the loop add class active
                //     var carouselItem = $("<div>");
                //     if(i === 0){
                //         carouselItem.attr("class", "active");
                //     }
                //     // var carouselItem = $("<div>");
                //     carouselItem.attr("class", "carousel-item");
                //     var image = $("<img>");
                //     image.attr("src", imgURL);
                //     carouselItem.append(image);
                //     $("#firstCarousel").append(carouselItem);
                // }

            });
        }
        display();
    });

    $("#submitButtonEmail").on("click", function (event) {
        var userName = $("#exampleInputEmail1").val().trim();
        var userPassword = $("#exampleInputPassword1").val().trim();
        // TODO: put validation
        var user = database.ref(userSignIn);
        var name = user.child(userName);

        name.once("value", function (data) {
            console.log(data);
            if (!data.exists()) {
                console.log("null name");
                $("#exampleInputPassword1").val("");
                $("#exampleInputEmail1").val("");
                return;
            }
            console.log(userPassword, data.val().userPassword);

            if (userPassword !== data.val().userPassword) {
                $("#exampleInputPassword1").val("");
            }
            else {
                $("#loginModal").modal("hide");
                $("#exampleInputPassword1").val("");
                $("#exampleInputEmail1").val("");
            }
            $("#signInButton").hide();
            $("#helloName").show();
            $("helloUserName").text(userName);
        });


    });
});

// var domainStr = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?"
// var mashupKey = "mashape-key=68365c6307msh33db7251321fad9p1ae0e9jsn68b66fe6fc3f"

// var domainWIthKey = domainStr + mashupKey;

// var cuisine = "cuisine=french"
// var limitLicence = "limitLicence=true"
// var searchNumber = "number=10"

// var apiString = `${domainWithKey}&${cuisine}&${limitLicence}&${searchNumber}`


// function searchRecipes() {
//     // VARIABLE TO STORE USER RECIPE
//     var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=16&query=goulash"

//     console.log(queryUrl)

//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//         headers: {
//             "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//             "X-RapidAPI-Key": "68365c6307msh33db7251321fad9p1ae0e9jsn68b66fe6fc3f"
//         },
//         success: function (response) {

//             console.log(response);
//             for (var i = 0; i < response.results.length; i++) {
//                 var searchRecipes = response.results[i].title;
//                 var recipeImage = response.results[i].image;
//                 var recipeCookTime = response.results[i].readyInMinutes;
//                 var recipeServings = response.results[i].servings;
//             }
//         },
//         error: function (result) {

//         }
//     })
// }

// function searchIngredients() {
//     // VARIABLE TO STORE USER INGREDIENTS
//     var queryUrl =  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=16&ranking=1&ignorePantry=true&ingredients=cheese" 

//     console.log(queryUrl)

//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//         headers: {
//             "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//             "X-RapidAPI-Key": "68365c6307msh33db7251321fad9p1ae0e9jsn68b66fe6fc3f"
//         },
//         success: function (response) {


//             console.log(response);
//             for (var i = 0; i < response.length; i++) {
//                 var ingredientsRecipes = response[i].title;
//                 var numberIngredientsMissed = response[i].missedIngredientCount;
//                 // console.log(ingredientsRecipes)
//                 var ingredientsImage = response[i].image;
//                 for (var j = 0; j < response[i].missedIngredients.length; j++) {
//                     var ingredientsMissing = response[i].missedIngredients[j].name;
//                     // console.log(ingredientsMissing)
//                 }
//                 for( var h = 0; h < response[i].missedIngredients.length; h++) {
//                     var ingredientAisle = response[i].missedIngredients[h].aisle;
//                     // console.log(ingredientAisle)
//                 }
//             }
//         },
//         error: function (result) {

//         }
//     })
// }

// function mealPlan() {
//     // VARIABLES FOR USER MEAL PLAN INPUT
//     var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=week&targetCalories=2000&diet=&exclude="

//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//         headers: {
//             "X-RapidAPI-Host":"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//             "X-RapidAPI-Key": "68365c6307msh33db7251321fad9p1ae0e9jsn68b66fe6fc3f"
//         },
//         success: function(response) {
//             console.log(response);
//         }
//     })
// }

// searchRecipes();
// searchIngredients();
// mealPlan();


