$(document).ready(function(){

var config = {
    apiKey: "AIzaSyCd7-6SWf4Hgq1O2kgNX2MX1aSSWo042L0",
    authDomain: "train-scheduler-d5f88.firebaseapp.com",
    databaseURL: "https://train-scheduler-d5f88.firebaseio.com",
    projectId: "train-scheduler-d5f88",
    storageBucket: "train-scheduler-d5f88.appspot.com",
    messagingSenderId: "71374450"
};
firebase.initializeApp(config);

var database = firebase.database();

$('.btn').on('click', function(e){
    e.preventDefault();

    var train = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTrain = $('#first-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().orderByChild('dateAdded').on('child_added', function(childSnapshot){

    var firstTrainMins = moment.duration(childSnapshot.val().firstTrain, "HH:mm").asMinutes();

    var nextArrivalMins = parseInt(firstTrainMins) + parseInt(childSnapshot.val().frequency);
    var nextArrivalHHmm = moment.duration(nextArrivalMins, "minutes").format("hh:mm");

    var currentTime = moment().format("HH:mm");
    var currentTimeMins = moment.duration(currentTime, "HH:mm").asMinutes();

    var minutesAway = Math.abs(nextArrivalMins - currentTimeMins);

    console.log(currentTime);
    console.log(currentTimeMins);

    $('.table-body').append(
        '<tr><td scope="row">' + childSnapshot.val().train + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + nextArrivalHHmm + '</td><td>'+ minutesAway + '</td></tr>'
    );
});
});