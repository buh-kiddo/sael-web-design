//Email JS
function validate() {
  let name = document.querySelector('.name')
  let email = document.querySelector('.email')
  let subject = document.querySelector('.subject')
  let msg = document.querySelector('.message')
  let sendBtn = document.querySelector('.send-btn')
  
  sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (name.value ==  "" || email.value ==  "" || subject.value == "" || msg.value ==  "") {
          emptyerror();
      } else{
          sendmail(name.value, email.value, subject.value, msg.value);
          success();
      }
  })
  }
  validate();
  
  function sendmail(name,email,subject,msg){
  emailjs.send("service_bqtsrp7","template_4wbyqov",{
  sender_name: name,
  sender_email: email,
  subject: subject,
  message: msg,
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