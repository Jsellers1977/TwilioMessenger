// Raj Kane

"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Get Twilio credentials
  // I've hidden my accountId and authToken. Replace the empty strings with your info. 
  this.accountId = "AC76dad3c9c0c9dcf04b8e00338920814a";
  this.authToken = "6af2eee2461045108f2f397d39443edd";
  this.fromNumber = "+13035006870";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  initialize: function() {
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  validateMessageField: function(textStr) {
    return !($.trim(textStr).length === 0);
  },
  validatePhoneField: function(phoneStr) {
    return (phoneStr.length === 11 && Number.isInteger(parseInt(phoneStr)));
  },
  // clearField: function(field) {
  //     field.val("");
  // }
  handleMessageSend: function(event) {
    // prevent this default behavior for the click `event`. Don't get rid of the test message yet
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if (this.validatePhoneField(phone) && this.validateMessageField(message)){
       $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
       success: function() {
         this.displayMessage(phone,message);
         this.messageInputField.val("");
       }.bind(this),
       method: 'POST',
       data: {
         From: this.fromNumber,
         To: phone,
         Body: message
       },
       headers: {
         "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
       }
     });
   }},
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
