import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';

export default class EditButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      r: '',
      g: '',
      b: '',
      a: '',
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.onChangeB = this.onChangeB.bind(this);
    this.onChangeA = this.onChangeA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //this runs right away
  componentDidMount() {
    //getting the id directly from the url
    axios.get('http://localhost:5000/edit/'+this.props.match.params.name)
      .then(response => {
        this.setState({
          name: response.data.name,
          r: response.data.r,
          g: response.data.g,
          b: response.data.b,
          a: response.data.a,
          buttons: [],
        })
      })
      .catch(function (error) {
        console.log(error);
      })


    axios.get('http://localhost:5000/plotbutton/')
      .then(response => {
        this.setState({
          buttons: response.data.map(button => button.button)
        })
      })
      .catch((error) => {
        console.log(error);
      })
     }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeR(e) {
    this.setState({
      r: e.target.value
    });
  }

  onChangeG(e) {
    this.setState({
      g: e.target.value
    });
  }

  onChangeB(e) {
    this.setState({
      b: e.target.value
    });
  }

  onChangeA(e) {
    this.setState({
      a: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents the default action
    const button = {
      name: this.state.name,
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
      a: this.state.a,
    }
    console.log(button);

    //send http post request data to backend endpoint, the second arg is json body
    //it is sent to backend/routes/events.js
    axios.post('http://localhost:5000/plotbutton/update/'+this.props.match.params.name, button)
      //a promise after it's posted, do this
      .then(res => console.log(res.data));

    //this will reset the form to blank so they can enter another event
    this.setState({
      name: '',
      r: '',
      g: '',
      b: '',
      a: '',
    })

    //Note: if we go back to calendar page after submitting, the changes don't take effect
    //window.location = '/event'
  }

  render() {
    return (
      <div className="container">

        <h3>Edit Button</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>R</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.r}
              onChange={this.onChangeR}
            />
          </div>
          <div className="form-group">
            <label>G</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.g}
              onChange={this.onChangeG}
            />
          </div>
          <div className="form-group">
            <label>B</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.b}
              onChange={this.onChangeB}
            />
          </div>
          <div className="form-group">
            <label>A</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.a}
              onChange={this.onChangeA}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Button"
              className="btn btn-primary"
            />
          </div>
        </form>

      </div>
    )
  }
}
