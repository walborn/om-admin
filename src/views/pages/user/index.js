import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../auth/signin';
import Profile from './profile';
import UserList from './list/index';
import UserItem from './item/index';

export default () => (
    <Switch>
        <Route path="/user/signin" component={SignIn} />
        <Route path="/user/me" component={Profile} />
        <Route path="/user/list" component={UserList} />
        <Route path="/user/item/:id" component={UserItem} />
    </Switch>
);
