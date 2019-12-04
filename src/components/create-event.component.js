import React from 'react';
import axios from 'axios';

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",   //ex: 11/28/2019
      details: ""
    }
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onChangeDetails(e) {
    this.setState({
      details: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents the default action
    const event = {
      date: this.state.date,
      details: this.state.details,
    }
    console.log(event);

    //send http post request data to backend endpoint, the second arg is json body
    //it is sent to backend/routes/events.js
    axios.post('http://localhost:5000/event/add', event)
      //a promise after it's posted, do this
      .then(res => console.log(res.data));

    //this will reset the form to blank so they can enter another event
    this.setState({
      date: '',
      details: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create new Event</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>Details</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.details}
              onChange={this.onChangeDetails}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Event"
              className="btn btn-primary"
            />
          </div>
        </form>

      </div>
    )
  }
}
