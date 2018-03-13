import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Session  } from 'meteor/session';

import { onAuthChange, routes } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
})

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
})