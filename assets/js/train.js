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
  var trainFreq = "";

  // Capture Button Click 
  // not sure if this correctly links to HTML
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-name-input").val().trim();
    trainDest = $("#train-dest-input").val().trim();
    trainTime = $("#time-input").val().trim();
    trainFreq = $("#freq-input").val().trim();

    // Code for handling the push
    trainsched.ref().push({
      train: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.dest);
    console.log(sv.time);
    console.log(sv.freq);

    // Change the HTML to reflect
    $("#name-display").text(sv.train);
    $("#email-display").text(sv.dest);
    $("#age-display").text(sv.time);
    $("#comment-display").text(sv.freq);

    $("#data-goes-here").append("<tr><td>" +
      snapshot.val().train +
      "</td><td>" +
      snapshot.val().dest +
      "</td><td>" +
      snapshot.val().time +
      "</td><td>" + freq + "</td><td>" +
      snapshot.val().freq +
      "</td><td>" + " " +
      "</td><td>" +
      "</tr>");

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })
});