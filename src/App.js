import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import HomePage from "./components/homepage.component"
import CropList from "./components/crops-list.component";
import CreateCrop from "./components/crop-create.component";
import EditEvent from "./components/event-edit.component";
import CreateEvent from "./components/event-create.component";
import PlotDiv from "./components/plot-div.component";
import PlotButton from "./components/plot-button.component";
import PlotEditButton from "./components/plot-button-edit.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br/>
        {/*--Homepage--*/}
        <Route path="/" exact component={HomePage} />
        {/*--Crops--*/}
        <Route path="/crops" component={CropList} />
        <Route path="/create" component={CreateCrop} />
        {/*--Calendar--*/}
        <Route path="/event" component={CreateEvent} />
        <Route path="/edit/:id" component={EditEvent} />
        {/*--Plot--*/}
        <Route path="/plot" component={PlotDiv} />
        <Route path="/plotbutton" component={PlotButton} />
        <Route path="/editbutton/:id" component={PlotEditButton} />
    </Router>
  );
}

export default App;
