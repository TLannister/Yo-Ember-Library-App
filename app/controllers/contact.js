import Controller from '@ember/controller';
import { and, match, gte } from '@ember/object/computed';

export default Controller.extend({

    isValidEmail: match('emailAddress', /^.+@.+\..+$/),
    isMessageEnoughLong: gte('message.length', 5),
  
    isValid: and('isValidEmail', 'isMessageEnoughLong'),
  
    actions: {
      sendMessage: function() {
        let email = this.emailAddress;
        let message = this.message;  
        let responseMessage = 'To: ' + email + ', Message: ' + message;

        this.set('responseMessage', responseMessage);
        this.set('emailAddress', '');
        this.set('message', '');

        const newContact = this.store.createRecord('contact', { email, message });
  
        newContact.save()
        .then(response => {
          this.set('responseMessage', `Thank you! We saved your email address with the following id: ${response.get('id')}`);
        });
      }
    }
  });