import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/homepage.component"

import CropList from "./components/crops-list.component";
import Crops from "./components/crops";
import CropForm from "./components/cropForm";
import CreateCrop from "./components/crop-create.component";

import EditEvent from "./components/event-edit.component";
import CreateEvent from "./components/event-create.component";

import PlotDiv from "./components/plot-div.component";
import PlotButton from "./components/plot-button.component";
import PlotEditButton from "./components/plot-button-edit.component";

import NotFound from "./components/notFound";
import Navbar from "./components/navbar.component";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* { <ProtectedRoute path="/crops/:id" component={CropForm} /> }
            <Route
              path="/crops"
               render={props => <Crops {...props} user={this.state.user} />}
            /> */}
            <Route path="/crops/:id" component={CropForm} />
            <Route path="/crops" component={Crops} />
            <Route path="/create" component={CreateCrop} />

            <Route path="/event" component={CreateEvent} />
            <Route path="/edit/:id" component={EditEvent} />

            <Route path="/plot" component={PlotDiv} />
            <Route path="/plotbutton" component={PlotButton} />
            <Route path="/update/:name" component={PlotEditButton} />
            <Route path="/editbutton/:id" component={PlotEditButton} />

            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
