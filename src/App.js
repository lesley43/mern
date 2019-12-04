import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import CropList from "./components/crops-list.component";
import EditCrop from "./components/edit-crop.component";
import CreateCrop from "./components/create-crop.component";
import CreateEvent from "./components/create-event.component";

function App() {
  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={CropList} />
        <Route path="/edit/:id" component={EditCrop} />
        <Route path="/create" component={CreateCrop} />
        <Route path="/event" component={CreateEvent} />
    </Router>
  );
}

export default App;
