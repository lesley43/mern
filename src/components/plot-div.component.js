import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class PlotDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '',
      g: '',
      b: '',
      a: '',
      buttons: [],
      divs: []
    }
    this.onChangeR = this.onChangeR.bind(this);
    this.onChangeG = this.onChangeG.bind(this);
    this.onChangeB = this.onChangeB.bind(this);
    this.onChangeA = this.onChangeA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.buttonList = this.buttonList.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/plotbutton/')
      .then(response => {
        this.setState({
          buttons: response.data.map(button => button.name)
         })
      })
      .catch((error) => {
        console.log(error);
      })


      axios.get('http://localhost:5000/plot')
        .then(response => {
          this.setState({
            divs: response.data.map(div => div._id)
          })
        })
  }

  buttonClick = (e) => {
    console.log('This button was clicked: ');
    console.log(e.target.value);
  }

  deleteButton(id) {
    axios.delete('http://localhost:5000/plotbutton/'+id)
      .then(res => console.log(res.data));
    this.setState({
      divs: this.state.divs.filter(el => el._id !== id)
    })
  }

  buttonList() {
    return this.state.buttons.map(current => {
      return (
        <div>
          <button
            key={current.name}
            type="button"
            className="btn btn-light"
            value={current}
            onClick={this.buttonClick}
            deletebutton={this.deleteButton}
            >
          {current}
          </button>
          <Link to={"/update/"+current}>edit</Link>
        </div>
      )
    })
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
    const div = {
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
      a: this.state.a
    }

    console.log(div);

    axios.post('http://localhost:5000/plot/add', div)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="container">
        <div>
          <h3>Button list area</h3>
          {this.buttonList()}
        </div>
        <div>
          <h3>Button Area</h3>
          {
            this.state.buttons.map(function(button) {
              return <button
                key={button.name}
                type="button"
                className="btn btn-primary"
                >
                {button}
                </button>;
            })
          }
        </div>
        <div>
          <h3>Plot Div Area</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>R: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.r}
              onChange={this.onChangeR}
            />
          </div>
          <div className="form-group">
            <label>G: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.g}
              onChange={this.onChangeG}
            />
          </div>
          <div className="form-group">
            <label>B: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.b}
              onChange={this.onChangeB}
            />
          </div>
          <div className="form-group">
            <label>A: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.a}
              onChange={this.onChangeA}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Div Area" className="btn btn-success" />
          </div>
        </form>
      </div>
    )
  }
}
