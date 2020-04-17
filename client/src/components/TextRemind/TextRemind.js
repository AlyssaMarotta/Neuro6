const mailgun = require("mailgun-js");
var express = require('express');


const api_key =process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
var from_who = process.env.MAILGUN_FROM;

const mg = mailgun({apiKey: api_key , domain: DOMAIN});
var app = express();

/*//Test email
const data = {
	from: from_who,
	to: "uf.neuro6@gmail.com",
	subject: "ENV Test",
    text: "blah blah ",
    //html: 'Reset password: <a href="http://0.0.0.0:3030/reset?">Click here to reset your password </a>'
};

mg.messages().send(data, function (error, body) {
    console.log(body);
});*/


//RESET PASSWORD
// Send a message to the specified email address when you navigate to /resetpass/someaddr@email.com
app.get('/resetpass/:mail', function(req,res) {

    const ResetPass = {
        from: from_who,
        to: "uf.neuro6@gmail.com", // req.params.mail
        subject: "Reset Password",
        text: "Hello, we were notified you would like to reset your password. If you did not send this notification please contact our offices immediately. ",
        html: 'Reset password: <a href="http://0.0.0.0:3030/reset?' + req.params.mail + '">Click here to reset your password </a>'
    };

    
    mg.messages().send(ResetPass, function (error, body) {
        console.log(body);
    });
});

//CONFIRM APPOINTMENT
// Send a message to the specified email address when you navigate to /conf/someaddr@email.com
app.get('/conf/:mail', function(req,res) {

    const AptConfirmation = {
        from: from_who,
        to: "uf.neuro6@gmail.com", // req.params.mail
        subject: "Appointment Confirmation",
        text: "Hello, Your request for an appointment has been recieved."
    };

    mg.messages().send(AptCancelation, function (error, body) {
        console.log(body);
    });
});

//APPOINTMENT REMINDER
// Send a message to the specified email address when you navigate to /remind/someaddr@email.com
app.get('/remind/:mail', function(req,res) {

    const AptReminder = {
        from: from_who,
        to: "uf.neuro6@gmail.com",
        subject: "Reminder: You have an appointment",
        text: "Hello, Here is a reminder that you have and appointment on _____ at _____ with _____"
    };
    
    mg.messages().send(AptReminder, function (error, body) {
        console.log(body);
    });
});

//CANCEL APPOINTMENT CONFIRMATION
// Send a message to the specified email address when you navigate to /cancel/someaddr@email.com
app.get('/cancel/:mail', function(req,res) {

    const AptCancelation = {
        from: from_who,
        to: "uf.neuro6@gmail.com",
        subject: "Cancelation Confirmation",
        text: "Hello, Your appointment has been canceled. To reschedule please contact UF Neurosurgery at _____"
    };
    
    mg.messages().send(AptCancelation, function (error, body) {
        console.log(body);
    });
});


//CURRENT OFFICE DELAY
// Send a message to the specified email address when you navigate to /cancel/someaddr@email.com
app.get('/cancel/:mail', function(req,res) {

    const delay = {
        from: from_who,
        to: "uf.neuro6@gmail.com",
        subject: "Experiencing Delays",
        text: "Hello, we contacting you to let you know that our office is running behind today and your apppointment has been delayed by ____ minutes"
    };
    
    mg.messages().send(delay, function (error, body) {
        console.log(body);
    });
});




//Add more endpoints

