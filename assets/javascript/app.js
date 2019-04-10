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
// database.ref(userSignIn).child("Lucy").set({
//     userName: "lucy@gmail.com",
//     userPassword: "password1",
// });
// database.ref(userSignIn).push({
//     userName: exampleInputEmail1,
//     userPassword: exampleInputPassword1,
// });
// step 1: read the users output. Step 2: check database. 
// Step 3: if they are - return the users name, change sign in button to users name. Load users data.
//  Step 4: if not - empty inputs.





$(document).ready(function () {
    var maxCalories;
    $("#buttonSearch").on("click", function () {
        maxCalories = $("#caloriesInput").val().trim();
        console.log(maxCalories);


        function displayAnimalInfo() {
            //  setting an API url
            var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?maxCalories=" + maxCalories;
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
            });
        }
        displayAnimalInfo();
    });

    $("#submitButton").on("click", function (event) {
        var userName = $("#exampleInputEmail1").val().trim();
        var userPssword = $("#exampleInputPassword1").val().trim();
        // TODO: put validation
        firebase.database.ref(userSignIn);
        var userNameRef = database.ref(userSignIn);


    });
});

