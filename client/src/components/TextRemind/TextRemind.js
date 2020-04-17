var twilio = require('twilio');
var express = require('express');
const http = require('http');


//var accountSid =process.env.TWILIO_SID;
//var authToken = process.env.TWILIO_AUTHTOKEN;
//var from_who = process.env.TWILIO_FROM;


var accountSid = 'AC104bdf5084dcc56cbe4f18ea60473a24'; 
var authToken = 'f6dedcd961aeee0096812710ecad52da'; 
var from_who = '+12058283252';  

var client = new twilio(accountSid, authToken);
var app = express();


/* //sample code to test message sending
client.messages.create({
    body: 'testing',
    to: '+19546369174',  // Text this number
    from: from_who // From a valid Twilio number
})
.then((message) => console.log(message.sid));
*/

//CURRENT OFFICE DELAY
// Send a message to the specified phone num when you navigate to /delay
//need to link admin side 
//need to get database of users with todays appointments (that havent passed)
//need to access time request to delay by
app.get('/delay', function(req,res) {
    
    var numbersToMessage = ["+15558675310", "+14158141829", "+15017122661"]
    numbersToMessage.forEach(function(number){
        var message = client.messages.create({
            body: 'Hello, we contacting you to let you know that our office is running behind today and your apppointment has been delayed by ____ minutes',
            from: from_who,
            to: number
        })
        .then(message =>  console.log(message))
        .done();
    });
});


//Add more endpoints

