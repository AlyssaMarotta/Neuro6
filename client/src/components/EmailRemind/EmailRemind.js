const mailgun = require("mailgun-js");
var express = require('express');


const mg = mailgun({apiKey: api_key , domain: DOMAIN});
var app = express();




const data = {
	from: "Mailgun Sandbox <postmaster@sandbox56eab1bf69994d5cba56dab25648f6fa.mailgun.org>",
	to: "uf.neuro6@gmail.com",
	subject: "Hello",
    text: "Testing some Mailgun awesomness!",
    //html: 'Reset password: <a href="http://0.0.0.0:3030/reset?">Click here to reset your password </a>'
};

mg.messages().send(data, function (error, body) {
    console.log(body);
});


// Send a message to the specified email address when you navigate to /resetpass/someaddr@email.com
app.get('/resetpass/:mail', function(req,res) {

    const ResetPass = {
        from: from_who,
        to: "uf.neuro6@gmail.com", // req.params.mail
        subject: "Reset Password",
        text: "Hello,",
        html: 'Reset password: <a href="http://0.0.0.0:3030/reset?' + req.params.mail + '">Click here to reset your password </a>'
    };

    
    mg.messages().send(ResetPass, function (error, body) {
        console.log(body);
    });
});

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





//Add more endpoints

