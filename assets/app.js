
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBzQ_9TYdDWu1iTo_yb3w_RtYKmCMoWuqE",
        authDomain: "train-time-ecca6.firebaseapp.com",
        databaseURL: "https://train-time-ecca6.firebaseio.com",
        projectId: "train-time-ecca6",
        storageBucket: "train-time-ecca6.appspot.com",
        messagingSenderId: "912251801862"
    };
    firebase.initializeApp(config);


    var database = firebase.database();



    database.ref().on("child_added", function (childSnapshot) {
        var frequency = parseInt(childSnapshot.val().frequency);
        var firstTime = childSnapshot.val().firstTime;
        var currentTime = moment();
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        var remainder = diffTime % frequency;
        var minutesAway = frequency - remainder;
        var nextArrival = moment(currentTime).add(minutesAway, "minutes");
        var nextTrainFormatted = moment(nextArrival).format("HH:mm");
        
        var newRow = $("<tr>");

        newRow.html(
            "<td>" + childSnapshot.val().name +
            "<td>" + childSnapshot.val().destination +
            "<td>" + frequency +
            "<td>" + nextTrainFormatted +
            "<td>" + minutesAway
        );

        $("tbody").append($(newRow));

    });

    $("#sButton").on("click", function (event) {
        event.preventDefault();
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var firstTime = $("#time-input").val().trim();


        database.ref().push({
            name: name,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");;
        $("#time-input").val("");
    });











});