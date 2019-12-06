import React, { Component } from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color'

export default class EditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      r: '',
      g: '',
      b: '',
      a: '',
      buttons: [],
      displayColorPicker: false,
      color: {
        r: '175',
        g: '175',
        b: '175',
        a: '100',
      },
      colorChosen: {
        r: '235',
        g: '235',
        b: '235',
        a: '100',
      },
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.onChangeB = this.onChangeB.bind(this);
    this.onChangeA = this.onChangeA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //this runs right away
  componentDidMount() {
    console.log(this.props.match.params.id);
    //getting the id directly from the url
    axios.get('http://localhost:5000/editbutton/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          r: response.data.r,
          g: response.data.g,
          b: response.data.b,
          a: response.data.a,
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
      r: this.state.color.r,
      g: this.state.color.g,
      b: this.state.color.b,
      a: this.state.color.a,
    }
    console.log(button);

    //send http post request data to backend endpoint, the second arg is json body
    //it is sent to backend/routes/plot-button.js
    axios.post('http://localhost:5000/plotbutton/update/'+this.props.match.params.id, button)
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

    window.location = '/plot'
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker }, this.setReady)
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({
      color: color.rgb,
      colorChosen: color.rgb,
    })
  };


  render() {

    const popover = {
          position: 'absolute',
          zIndex: '2',
        }
        const cover = {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }

        const clearStyle = {
          backgroundColor: `rgba(235, 235, 235, 100)`,
          color: "black"
        }

    return (
      <div className="container">

        <h3>Edit Button</h3>

        <div>
          <button onClick={ this.handleClick }>Pick Color</button>
          { this.state.displayColorPicker ? <div style={ popover }>
            <div style={ cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange }/>
            </div> : null }
        </div>

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
              value={this.state.color.r}
              onChange={this.onChangeR}
            />
          </div>
          <div className="form-group">
            <label>G</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.color.g}
              onChange={this.onChangeG}
            />
          </div>
          <div className="form-group">
            <label>B</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.color.b}
              onChange={this.onChangeB}
            />
          </div>
          <div className="form-group">
            <label>A</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.color.a}
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
