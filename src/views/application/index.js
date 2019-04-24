import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pages from 'src/views/pages';
import Header from 'src/views/application/header/index';
import './index.scss';


export default class Application extends React.Component {
    render() {
        return (
            <div id="application">
                <Header />
                <main className="main">
                    <Switch>
                        <Route exact path="/lesson" component={Pages.Lesson} />
                        <Route exact path="/feedback" component={Pages.Feedback} />
                        <Route path="/auth" component={Pages.Auth} />
                        <Route path="/user" component={Pages.User} />
                        <Route component={Pages.NotFound} />
                    </Switch>
                </main>
            </div>
        );
    }
}
