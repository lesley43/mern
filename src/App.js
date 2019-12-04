import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import HomePage from "./components/homepage.component"
import CropList from "./components/crops-list.component";
import CreateCrop from "./components/crop-create.component";
import EditEvent from "./components/event-edit.component";
import CreateEvent from "./components/event-create.component";
import PlotPage from "./components/plot-create.component"

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
        <Route path="/plotpage" component={PlotPage} />
    </Router>
  );
}

export default App;
