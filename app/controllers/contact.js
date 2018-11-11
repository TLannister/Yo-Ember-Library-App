import Controller from '@ember/controller';
import { and, match, gte } from '@ember/object/computed';

export default Controller.extend({

    isValidEmail: match('emailAddress', /^.+@.+\..+$/),
    isMessageEnoughLong: gte('message.length', 5),
  
    isValid: and('isValidEmail', 'isMessageEnoughLong'),
  
    actions: {
      sendMessage: function() {
        var email = this.emailAddress;
        var message = this.message;
  
        alert('Sending your message in progress... ');
  
        var responseMessage = 'To: ' + email + ', Message: ' + message;
        this.set('responseMessage', responseMessage);
        this.set('emailAddress', '');
        this.set('message', '');
      }
    }
  });