import { AutoForm } from 'meteor/aldeed:autoform';

AutoForm.addHooks('registrationForm', {
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    this.event.preventDefault();

    const username = insertDoc.username;
    const password = insertDoc.password;
    const confirmPassword = insertDoc.confirmPassword;

    Meteor.call('registerUser', username, password, confirmPassword, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        Router.go('/dashboard');
      }
    });

    this.done();
  },
});
