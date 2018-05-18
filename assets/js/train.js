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
  var trainSched = firebase.database().ref().child("trainTable");
  var trainName = "";
  var trainDest = "";
  var trainTime = 0;
  var trainFreq = 0;
  var trainKey = "";

  // set clock for header
  setInterval(function () {
    $('#time').html(moment().format('MMMM Do YYYY; h:mm:ss a'))
  }, 1000);

  moment().format();
  var date = null;

  var updateDateTime = moment();
  var newTrainTime = 0;

  // Capture Button Click 
  // not sure if this correctly links to HTML
  $(document).on("click", "#delete", removeTrain);
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-input").val().trim();
    trainDest = $("#dest-input").val().trim();
    trainTime = moment($('#ftime-input').val().trim(), "HH:mm").format("X");
    trainFreq = $("#freq-input").val().trim();
    newTrainTime = moment().format("X");

    // Code for handling the push
    database.ref().child("trains").push({
      trainName: trainName,
      trainDest: trainDest,
      trainTime: trainTime,
      trainFreq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // Clear the text boxes
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // get the current time
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log("Train Time Converted: " + trainTimeConverted);


    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    var displayTime = moment(currentTime).format("hh:mm a");
    var timeNow = moment().format('h:mm:ss a');


    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    console.log(trainFreq);
    var tRemainder = diffTime % trainFreq;
    console.log("tRemainder: " + tRemainder);

    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("Minutes till Train: " + tMinutesTillTrain);
    var trainMinutes = moment(tMinutesTillTrain).format("hh:mm");
    console.log("Minutes tii train (formatted): " + trainMinutes);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("Arrivals time: " + moment(nextTrain).format("hh:mm"));
    var trainArrival = moment(nextTrain).format("hh:mm A");
    // console.log(trainArrival);

    // Change the HTML to reflect
    // $("#time").text("Current time: " + timeNow);
    $("#name-display").text(sv.trainName);
    $("#dest-display").text(sv.trainDest);
    $("#time-display").text(sv.trainTimeConverted);
    $("#freq-display").text(sv.trainFreq);

    console.log(trainArrival);

    $("#data-goes-here").append("<tr><td>" +
      snapshot.val().trainName +
      "</td><td>" +
      snapshot.val().trainDest +
      "</td><td>" +
      snapshot.val().trainFreq +
      "</td><td>" +
      trainArrival +
      "</td><td>" +
      tMinutesTillTrain +
      "</td><td>" + "<span id='delete'>X</span></div>" +
      "</td><td>" +
      "</tr>");
    // console.log(snapshot.val().key);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })

  function removeTrain() {
    var trainKey = $(this).attr("data-train");
    database.ref("trains/" + trainKey.remove());
    var currentRow = $(this).closest("tr");
    // event.preventDefault();

    // e.preventDefault();
    // e.stopPropogation();
    // var key = $(this).data('key');
    // console.log(key);
    // firebase.database().ref("trainTable").child(key).remove;


    // console.log(trainId);
    // var col1 = currentRow.find("td:eq(0)").text();
    // var trainCode = col1.substr(0, 3);
    // trainSched.orderByChild("trainCode".equalTo(trainCode).on("value", function (snapshot) {
    //   console.log("Row to be deleted is: " + snapshot.val().trainName);
    // }))
    // remove();
    $(this).closest("tr").remove();
    var getKey = $(this).parent().attr("id");
    console.log(getKey);
  };

  // database.ref().child(getKey).remove();

});