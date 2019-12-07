import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';

const Event = props => (
  <tr>
    <td>{props.event.date}</td>
    <td>{props.event.details}</td>
    <td>
      <Link to={"/edit/"+props.event._id}>edit</Link> | <a href="#" onClick={() => { props.deleteEvent(props.event._id) }}>delete</a>
    </td>
  </tr>
)

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    let today = new Date();
    let yy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let parsed = mm + '/' + dd + '/' + yy;

    this.state = {
      date: new Date(),
      newDate: parsed,  //ex: 11/28/2019
      details: "",
      events: [],
    }

    this.onChange = this.onChange.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDetails = this.onChangeDetails.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  //this runs right away
  componentDidMount() {
    axios.get('http://localhost:5000/event/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    }

  deleteEvent(id) {
    axios.delete('http://localhost:5000/event/'+id)
      .then(res => console.log(res.data));
    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }

    onChange = (date) => {
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let parsed = mm + '/' + dd + '/' + yy;
    this.setState({ date });
    this.setState({ newDate: parsed});
  }

  eventList() {
    return this.state.events.map(current => {
      return <Event event={current} deleteEvent={this.deleteEvent} key={current._id} />;
    })
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
      date: this.state.newDate,
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
      newDate: '',
      details: ''
    })
    
  }

  render() {
    return (
      <div className="container">

      <div className="row">
        <div className="col">
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
        </div>
        <div className="col">
          <h3>Events</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.eventList()}
            </tbody>
          </table>
        </div>
    </div>



        <h3>Create new Event</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.newDate}
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
