//
//
//
//
//
//first train
//frequency

//Start with entering first: train name/destination/first train time/frequency
//initial .on("click") should generate new html rows
//containing  train name / destination / frequency / Next arrival / number of minutes away
//next arrival and to the destination will be calculated on the basis of frequency entered
//minutes aways from arrival will be calculated on the basis of frequency entered

// Steps to complete:
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//
//default data should be in the table
//default data include
//train name
//destination
//first train time
//frequency

//Start with entering first: train name/destination/first train time/frequency
//initial .on("click") should generate new html rows
//containing  train name / destination / frequency / Next arrival / number of minutes away
//next arrival and to the destination will be calculated on the basis of frequency entered
//minutes aways from arrival will be calculated on the basis of frequency entered

// Steps to complete:

// 1. Initialize Firebase

let firebaseConfig = {
  apiKey: "AIzaSyDSyQPuAg2L5pet5svCuM0R6CInIQQKKuc",
  authDomain: "train-fee90.firebaseapp.com",
  databaseURL: "https://train-fee90.firebaseio.com",
  projectId: "train-fee90",
  storageBucket: "train-fee90.appspot.com",
  messagingSenderId: "187493384639",
  appId: "1:187493384639:web:47fbba278fc6a3fb49210a",
  measurementId: "G-SPNE68HYHY",
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// 2. Button for adding train

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // input captured
  let trainName = $("#trainame-input").val().trim();
  let trainDestination = $("#destination-input").val().trim();

  // http://jinzhk.github.io/yfjs/static/demo/moment/index.html
  //moment.max(Moment[,Moment...])
  //Returns the maximum (most distant future) of the given moment instances.
  //var a = moment().subtract(1, 'day');
  //var b = moment().add(1, 'day');
  //moment.max(a, b);  // b
  //With no arguments the function returns a moment instance with the current time.

  //let trainFirstTime = moment($("#firstrain-input").val().trim(),"HH:mm").subtract(1, "years");
  let trainFirstTime = $("#firstrain-input").val().trim();
  let trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  let newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clearings  the text-boxes
  $("#trainame-input").val("");
  $("#destination-input").val("");
  $("#firstrain-input").val("");
  $("#frequency-input").val("");
});

getdelta = function (trainFirstTime, now, frequence) {
  //return -1;
  let tinit = moment(trainFirstTime, "HH:mm"); //
  let tnow = moment(now, "HH:mm"); //
  let _diff = tnow.diff(tinit, "minutes");
  let alpha = Math.ceil(_diff / frequence);
  let interval = alpha * frequence;
  let tdelta = tinit.add(interval, "minutes");
  return tdelta; //object moment
};

getnextarrival = function (tdelta) {
  let resp = tdelta.format("HH:mm");
  return resp; // string object
};

getminuteAway = function (_now, tdelta) {
  let _diff = tdelta.diff(_now, "minutes");
  return _diff;
};

///next arrival next arrival - current time

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  let trainName = childSnapshot.val().name;
  let trainDestination = childSnapshot.val().destination;
  let trainFirstTime = childSnapshot.val().firstTime;
  let trainFrequency = childSnapshot.val().frequency;

  let _now = new moment(); //current time
  let now = _now.format("HH:mm"); //
  let tdelta = getdelta(trainFirstTime, now, trainFrequency);
  let nextarrival = getnextarrival(tdelta);
  let minuteAway = getminuteAway(_now, tdelta);
  // minute away function of current time and next arrival time

  // Employee Info Store everything into a variable.
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTime);
  console.log(trainFrequency);

  //New rows appended
  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    //$("<td>").text(trainFirstTime),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextarrival),
    $("<td>").text(minuteAway)
  );

  // Append rows to the table
  $("#train-table > tbody").append(newRow);
  ///////////////////////////
});

//************************************************************************************* */
