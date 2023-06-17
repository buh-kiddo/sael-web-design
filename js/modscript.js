//client-side
//Email JS
function validate() {
    let name = document.querySelector('.name')
    let email = document.querySelector('.email')
    let msg = document.querySelector('.message')
    let sendBtn = document.querySelector('.send-btn')
  
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (name.value ==  "" || email.value ==  "" || msg.value ==  "") {
            emptyerror();
        } else{
          sendmail(name.value, email.value, msg.value);
          success();
        }
    })
  }
  
  function sendmail(name,email,msg){
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, msg})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      success();
    })
    .catch(error => {
      console.error('There was an error sending the email:', error);
    });
  }
  
  function emptyerror() {
    swal({
      title: "Oh No...!",
      text: "Fields cannot be empty!",
      icon: "error",
    });
  }
  
  function success() {
    swal({
      title: "Email sent successfully",
      text: "We try to reply in 24 hours",
      icon: "success",
    });
  }
  
  validate();

  
//server side using node.js and nodemailer lib

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, msg } = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'recipient-email@example.com',
    subject: 'New Contact Form Submission',
    text: msg
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('There was an error sending the email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.send('OK');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Email Validation
function validateEmail(email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,$/;
  return emailRegex.test(email);
  }
  
