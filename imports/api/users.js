import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

const UsersSchema = new SimpleSchema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

Meteor.methods({
  registerUser: function(username, password, confirmPassword) {
    check(username, String);
    check(password, String);
    check(confirmPassword, String);

    if (password !== confirmPassword) {
      throw new Meteor.Error("password-mismatch", "Passwords do not match.");
    }

    if (Meteor.users.findOne({ username })) {
      throw new Meteor.Error("username-exists", "Username is already in use.");
    }

    const userId = Accounts.createUser({ username, password });

    if (!userId) {
      throw new Meteor.Error("registration-failed", "User registration failed.");
    }
  },

  loginUser: function(username, password) {
    check(username, String);
    check(password, String);

    const user = Meteor.users.findOne({ username });

    if (!user) {
      throw new Meteor.Error("user-not-found", "User not found. Please check your username.");
    }

    try {
      Meteor.loginWithPassword(username, password);
    } catch (e) {
      throw new Meteor.Error("login-failed", "Login failed. Please check your credentials.");
    }
  },
});

export default UsersSchema;
