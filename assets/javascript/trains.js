$(document).ready(function(){
    console.log("hello world");
    // 1. Initialize Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyBCIUzuVsvaifJcnVvcyRvS464E5zGuy_k",
        authDomain: "trains-1060d.firebaseapp.com",
        databaseURL: "https://trains-1060d.firebaseio.com",
        projectId: "trains-1060d",
        storageBucket: "",
        messagingSenderId: "416672024241",
        appId: "1:416672024241:web:fb84d2794f5c0aee"
      };  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    
    // 2. Button for adding Trains
    $("#trainSubmit").click(function(){
        // Store each of the text box inputs into a variable
        var trainName = $("#nameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var firstTrainTime = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
        var frequency = $("#frequencyInput").val().trim();
        
        console.log("This is the name input:" + trainName);

        // create a local temporary object to hold data
        var newTrain =  {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: frequency,
            // eta: eta
        };

        // Log everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);
        console.log(newTrain.eta);

        // Upload train info to the database
        database.ref().push(newTrain);



        // clear text boxes
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainInput").val("");
        $("#frequencyInput").val("");
    });


    // function calcETA(){
    //     if (newTrain.time > /*CURRENT TIME*/ ) {
    //         //Next train IS the first train
    //     } else {
    //         // Calculate difference (modular [%]) between CURRENT_TIME and next Interval
    //     };

// minutes away = difference between Next Time and Now



    /*
If we load before the first train, then the next train IS the first train.
If not is before first train, next train IS firs train
OTHERWISE, 
*/

// 







    database.ref().on("child_added", function(childSnapshot) {
        var eta = 0; 
        console.log(childSnapshot.val());
        
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;
        
        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrainTime);
        console.log(frequency);
        console.log("Minutes Away:" + minutesAway);
        
                
        //currentTime
        var currentTime = moment();


        var difference = currentTime.diff(moment(firstTrainTime, "X"), "minutes");
        var remainder = difference % frequency;
        var minutesAway = frequency - remainder;
        var nextArrival = currentTime.add(minutesAway, "minutes").format("LT");




        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minutesAway)
        );
        
        // Append the new row to the table
        $("#tbody").append(newRow);
    });
});