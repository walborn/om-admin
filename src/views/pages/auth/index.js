import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './signin';

export default () => (
    <Switch>
        <Route path="/auth/signin" component={SignIn} />
    </Switch>
);
