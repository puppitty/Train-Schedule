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
      TrainDest: trainDest,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.trainName);
    console.log(sv.trainDest);
    console.log(sv.trainTime);
    console.log(sv.trainFreq);

    // Change the HTML to reflect
    $("#name-display").text(sv.trainName);
    $("#dest-display").text(sv.trainDest);
    $("#time-display").text(sv.trainTime);
    $("#freq-display").text(sv.trainFreq);

    $("#data-goes-here").append("<tr><td>" +
      snapshot.val().trainName +
      "</td><td>" +
      snapshot.val().trainDest +
      "</td><td>" +
      snapshot.val().trainTime +
      "</td><td>" + trainFreq + "</td><td>" +
      snapshot.val().trainFreq +
      "</td><td>" + " " +
      "</td><td>" +
      "</tr>");

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })
});