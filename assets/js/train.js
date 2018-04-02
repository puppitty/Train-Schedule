$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrSmGEhd5hs88PeVMQMLWBgF6AtrM133M",
    authDomain: "train-schedule-a3255.firebaseapp.com",
    databaseURL: "https://train-schedule-a3255.firebaseio.com",
    projectId: "train-schedule-a3255",
    storageBucket: "train-schedule-a3255.appspot.com",
    messagingSenderId: "92874467187"
  };
  firebase.initializeApp(config);

  // Initial Values
  var database = firebase.database();
  var trainName = "";
  var trainDest = "";
  var trainTime = 0;
  var trainFreq = 0;

  // Capture Button Click 
  // not sure if this correctly links to HTML
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-input").val().trim();
    trainDest = $("#dest-input").val().trim();
    trainTime = $("#time-input").val().trim();
    trainFreq = $("#freq-input").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      trainDest: trainDest,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.logging the last user's data
    // console.log(sv.trainName);
    // console.log(sv.trainDest);
    // console.log(sv.trainTime);
    // console.log(sv.trainFreq);

    // get the current time
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1,"years");
    console.log("Train Time Converted: " + trainTimeConverted);


    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

   
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    console.log(trainFreq);
    var tRemainder = diffTime % trainFreq;
    console.log("tRemainder: " + tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("Minutes till Train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrivals time: " + moment(nextTrain).format("hh:mm"));
    var trainArrival = moment(nextTrain).format("hh:mm");
    // console.log(trainArrival);

    // Change the HTML to reflect
    $("#name-display").text(sv.trainName);
    $("#dest-display").text(sv.trainDest);
    $("#time-display").text(sv.trainTime);
    $("#freq-display").text(sv.trainFreq);

    console.log(trainArrival);

    $("#data-goes-here").append("<tr><td>" +
      snapshot.val().trainName +
      "</td><td>" +
      snapshot.val().trainDest +
      "</td><td>" +
      snapshot.val().trainFreq +
      "</td><td>" + 
      snapshot.val().trainArrival +
      "</td><td>" + 
      snapshot.val().tMinutesTillTrain +
      "</td><td>" + " " +
      "</td><td>" +
      "</tr>");

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })
});