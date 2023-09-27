import { AutoForm } from 'meteor/aldeed:autoform';

AutoForm.addHooks('loginForm', {
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    this.event.preventDefault();

    const username = insertDoc.username;
    const password = insertDoc.password;

    Meteor.call('loginUser', username, password, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        Router.go('/dashboard');
      }
    });

    this.done();
  },
});
