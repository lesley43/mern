import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const PlotButton = props => (
  <div className="col">
    <button
      type="button"
      className="btn-btn-light"
      key={props.plotbutton._id}
      onClick={() => {props.buttonClick(props.plotbutton._id)}}
      >
      {props.plotbutton.name}
    </button>
    <Link to={"/editbutton/"+props.plotbutton._id}>edit</Link> | <a href="#" onClick={() => {props.deleteButton(props.plotbutton._id)}}>delete</a>
  </div>
)

const PlotSection = props => (
  <tr>
    <td>{props.plotsection._id}</td>
    <td>{props.plotsection.r}</td>
    <td>{props.plotsection.g}</td>
    <td>{props.plotsection.b}</td>
    <td>{props.plotsection.a}</td>
  </tr>
)


export default class PlotDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '',
      g: '',
      b: '',
      a: '',
      buttons: [],
      buttonNames: [],
      buttonList: [],
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
    this.divClick = this.divClick.bind(this);
  }

  componentDidMount() {
    //retry list method
    axios.get('http://localhost:5000/plotbutton/')
      .then(response => {
        this.setState({buttonList: response.data})
      })
      .catch((error) => {
        console.log(error);
      })


    //get button ids
    axios.get('http://localhost:5000/plotbutton/')
      .then(response => {
        this.setState({
          buttons: response.data.map(button => button._id)
         });
      })
      .catch((error) => {
        console.log(error);
      })

      //get button names
      axios.get('http://localhost:5000/plotbutton/')
        .then(response => {
          this.setState({
            buttonNames: response.data.map(button => button.name)
           })
        })
        .catch((error) => {
          console.log(error);
        })

      //get plot info
      axios.get('http://localhost:5000/plot/')
        .then(response => {
          this.setState({divs: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }

  buttonClick(id) {
    console.log('This button was clicked: ');
    console.log(id);
  }

  divClick(id) {
    console.log("clicked");
  }

  deleteButton(id) {
    axios.delete('http://localhost:5000/plotbutton/'+id)
      .then(res => console.log(res.data));
    this.setState({
      buttonList: this.state.buttonList.filter(el => el._id !== id),
    })
  }

  buttonList() {
    return this.state.buttonList.map(current => {
      return <PlotButton plotbutton={current} buttonClick={this.buttonClick} deleteButton={this.deleteButton} key={current._id} />
    })
  }

  divList() {
    return this.state.divs.map(current => {
      return <PlotSection plotsection={current} divClick={this.divClick} key={current._id} />
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
    console.log('from plot-div');
    console.log(this.state.buttons);

    axios.post('http://localhost:5000/plot/add', div)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.buttonList()}
        </div>

        <div>
          <h3>Plot Div Area</h3>
          {this.divList()}
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
