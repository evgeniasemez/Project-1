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

    $("#submitButtonEmail").on("click", function (event) {
        var userName = $("#exampleInputEmail1").val().trim();
        var userPassword = $("#exampleInputPassword1").val().trim();
        // TODO: put validation
        var user = database.ref(userSignIn);
        var name = user.child(userName);
        // Step 2: check database. 
        // Step 3: if they are - return the users name, change sign in button to users name. Load users data.
        //  Step 4: if not - empty inputs.
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

