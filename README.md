# Neuro6

Web app for the Lillian S. Wells Department of Neurosurgery at the University of Florida.

## Client

Lillian S. Wells Department of Neurosurgery at the University of Florida

## Team 

* Jason Fernandez
* Samia Gilani
* Peyton Marinelli
* Alyssa Marotta
* Darren Wang
* Bradon Zhang

We created a web app for the UF Neurosurgery department to allow patients and admins to request, view, and add appointments. The app allows patients to create an account, view upcoming appointments and reminders, view contact and clinic location information, and request new appointments. The app also allows admins to create an account, view current patient and appointment information, approve appointments, and create new appointments.

We used the MERN technology stack (MongoDB, Express.js, React.js, and Node.js) to implement the project.

## Features

### Patients

* Patients can create an account
* Patients can view upcoming appointments on a calendar
* Patients can see reminders about upcoming appointments
* Patients can request new appointments
* Patients can view ‘Contact and Find Us’ information
* Patients receive emails about their appointments
* Patients can request a reschedule reschedule appointments
* Patients can cancel appointments
* Patients can look at where the appointment is scheduled
* Patients can be routed to Google Maps to take them to the appointment

### Admins

* Admin can view patient and appointment information
* Admin can update the title of existing appointment
* Admin can cancel an appointment
* Admin can filter appointments and patients
* Admin can approve and update appointment requests
* Admin can make a new appointment
* Admin can create a new patient account
* Admin can create a new Admin account
* Admin can push back an appointment by a desired amount of time

## APIs

* CRUD
* * RESTful API implemented using Express, connecting to MongoDB.
* crypto
* * npm library used for generating random strings and hashing.
* * Used for generating salts for passwords and hashing them to securely store passwords.
* node-cron
* * npm cron-job library for scheduling events.
* * While not fully implemented in the project, its purpose is to send scheduled reminders to patients with upcoming appointments.
* Google Maps
* * Used to display the maps within appointments and the contact and find us page.
* * The API key will need to be updated with a key that is attatched to a credit card
* Mailgun
* * Mailgun is a service for sending emails.
* * While not implemented in the project, Mailgun would be used to send emails to patients regarding approved appointment requests, appointment reminders, and appointment delays.
* Twilio
* * Twilio is a service for sending SMS.
* * While not implemented in the project, Twilio would be used to send text messages to patients regarding approved appointment requests, appointment reminders, and appointment delays.
