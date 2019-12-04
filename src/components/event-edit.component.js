import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

export default class EditEvent extends Component {
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
  }

  //this runs right away
  componentDidMount() {
    //getting the id directly from the url
    axios.get('http://localhost:5000/edit/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          date: response.data.date,
          details: response.data.details
        })
      })
      .catch(function (error) {
        console.log(error);
      })


    axios.get('http://localhost:5000/event/')
      .then(response => {
        this.setState({
          events: response.data.map(event => event.event)
        })
      })
      .catch((error) => {
        console.log(error);
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
    axios.post('http://localhost:5000/event/update/'+this.props.match.params.id, event)
      //a promise after it's posted, do this
      .then(res => console.log(res.data));

    //this will reset the form to blank so they can enter another event
    this.setState({
      newDate: '',
      details: ''
    })

    //Note: if we go back to calendar page after submitting, the changes don't take effect
    //window.location = '/event'
  }

  render() {
    return (
      <div className="container">

      <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />

        <h3>Edit Event</h3>
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
              value="Edit Event"
              className="btn btn-primary"
            />
          </div>
        </form>

      </div>
    )
  }
}
