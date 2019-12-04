import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import HomePage from "./components/homepage.component"
import CropList from "./components/crops-list.component";
import EditEvent from "./components/edit-event.component";
import CreateCrop from "./components/create-crop.component";
import CreateEvent from "./components/create-event.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/crops" component={CropList} />
        <Route path="/create" component={CreateCrop} />
        <Route path="/event" component={CreateEvent} />
        <Route path="/edit/:id" component={EditEvent} />
    </Router>
  );
}

export default App;
