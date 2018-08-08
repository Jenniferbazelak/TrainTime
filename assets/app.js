$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBzQ_9TYdDWu1iTo_yb3w_RtYKmCMoWuqE",
        authDomain: "train-time-ecca6.firebaseapp.com",
        databaseURL: "https://train-time-ecca6.firebaseio.com",
        projectId: "train-time-ecca6",
        storageBucket: "",
        messagingSenderId: "912251801862"
      };
      firebase.initializeApp(config);
   
    
      var database= firebase.database();

$("#sButton").on("click", function(){
        var name = $("#name-input").val();
        var destination = $("#destination-input").val();
       var frequency = $("#frequency-input").val();
       var firstTime = moment(($("#time-input").val()), "HH:mm").subtract(1, "years");
       var currentTime = moment();
       var diffTime = moment().add(moment(firstTime), "minutes");
       var remainder = diffTime % frequnncy; 
       var minutesAway= frequency - remainder; 
        var nextArrival = (moment().add(minutesAway,'minutes'));
        
        
    

    database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });

    database.ref().on("child_added", function(childSnapshot){
       
        var newRow=$("<tr>");
        

        newRow.html(
            "<td>" + childSnapshot.val().name +
            "<td>" + childSnapshot.val().destination +
            "<td>" + childSnapshot.val().frequency +
            "<td>" + nextArrival +
            "<td>" + minutesAway
        );

        $("tbody").append($(newRow));

        

   
         

    });



});



  


  
});