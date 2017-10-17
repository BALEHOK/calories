import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as pages from 'pages';
const MasterPage = pages.MasterPage;

export default class NavigationRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/">
          <MasterPage>
            <Route path="/" exact component={pages.CaloriesListPage} />
            <Route path="/login" exact component={pages.LoginPage} />
            <Route path="/register" exact component={pages.RegistrationPage} />
            <Route path="/users" exact component={pages.UserManagementPage} />
          </MasterPage>
        </Route>
      </BrowserRouter>
    );
  }
}

