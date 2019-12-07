import React from 'react';
import axios from 'axios';
import { SketchPicker } from 'react-color';

export default class PlotButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      r: '',
      g: '',
      b: '',
      a: '',
      buttons: [],
      color: {
        r: '175',
        g: '175',
        b: '175',
        a: '100',
      },
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeR = this.onChangeR.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.onChangeB = this.onChangeB.bind(this);
    this.onChangeA = this.onChangeA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (color) => {
    this.setState({
      color: color.rgb,
    })
    this.onchangeR();
  };

  onChangeName(e) {
    this.setState ({
      name: e.target.value
    });
  }

  onChangeR(e) {
    this.setState ({
      r: e.target.value
    });
  }

  onChangeG(e) {
    this.setState ({
      g: e.target.value
    });
  }

  onChangeB(e) {
    this.setState ({
      b: e.target.value
    });
  }

  onChangeA(e) {
    this.setState ({
      a: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const button = {
      name: this.state.name,
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
      a: this.state.a
    }

    console.log(button);

    axios.post('http://localhost:5000/plotbutton/add', button)
      .then(res => console.log(res.data));


    //window.location="/plotpage";

  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col">
          <h3>Create Crop button</h3>
          {
            this.state.buttons.map(function(button) {
              return <button
                type="button"
                class="btn btn-primary">
                {button.name}
                </button>;
            })
          }
          <SketchPicker />
          </div>

          <div className="col">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>R: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.color.r}
                onChange={this.onChangeR}
              />
            </div>
            <div className="form-group">
              <label>G: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.color.g}
                onChange={this.onChangeG}
              />
            </div>
            <div className="form-group">
              <label>B: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.color.b}
                onChange={this.onChangeB}
              />
            </div>
            <div className="form-group">
              <label>A: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.color.a}
                onChange={this.onChangeA}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Crop Button" className="btn btn-success" />
            </div>
          </form>
          </div>
        </div>

      </div>
    )
  }
}
