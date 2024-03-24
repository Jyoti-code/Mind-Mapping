import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault(); // Prevents the default form submission behavior

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual values
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log('Email successfully sent:', result.text);
          // You might want to show a success message to the user instead of reloading the page
      })
      .catch((error) => {
          console.error('Error sending email:', error);
          // You might want to show an error message to the user
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="from_name" required />
      <label>Email</label>
      <input type="email" name="from_email" required />
      <label>Subject</label>
      <input type="text" name="subject" required />
      <label>Message</label>
      <textarea name="html_message" required />
      <input type="submit" value="Send" />
    </form>
  );
}
