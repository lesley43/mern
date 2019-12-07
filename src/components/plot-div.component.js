import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const PlotButton = props => (
  <div className="col">
    <button
      type="button"
      className="btn-btn-light"
      key={props.plotbutton._id}
      style={{ backgroundColor: props.buttonStyling(props.plotbutton.r, props.plotbutton.g, props.plotbutton.b, props.plotbutton.a)}}
      onClick={() => {props.buttonClick(props.plotbutton._id)}}
      >
      {props.plotbutton.name}
    </button>
    <br/>
    <Link to={"/editbutton/"+props.plotbutton._id}>edit</Link> | <a href="#" onClick={() => {props.deleteButton(props.plotbutton._id)}}>delete</a>
  </div>
)

const PlotSection = props => (
  <div style={{display: props.divDisplay()}}>
    <button
      type="button"
      className="btn-btn-light"
      key={props.plotsection._id}
      style={{
        backgroundColor: props.divStyling(props.plotsection.r, props.plotsection.g, props.plotsection.b, props.plotsection.a),
        height: props.divSizeHeight(),
        width: props.divSizeWidth(),
        }}
      onClick={() => {props.divClick(props.plotsection._id)}}
    >
    </button>
  </div>
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
    this.divStyling = this.divStyling.bind(this);
    this.buttonStyling = this.buttonStyling.bind(this);
    this.divSizeHeight = this.divSizeHeight.bind(this);
    this.divSizeWidth = this.divSizeWidth.bind(this);
    this.divDisplay = this.divDisplay.bind(this);
    this.handleClear = this.handleClear.bind(this);

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

  divStyling(r, g, b, a) {
    const thisR = r;
    const thisG = g;
    const thisB = b;
    const thisA = a;
    const background = 'rgba(' + thisR + ',' + thisG + ',' + thisB + ',' + thisA + ')';
    return background;
  }

  divSizeHeight() {
    return "50px"
  }

  divSizeWidth() {
    return "50px"
  }

  divDisplay() {
    return "inline-block"
  }

  buttonStyling(r, g, b, a) {
    const thisR = r;
    const thisG = g;
    const thisB = b;
    const thisA = a;
    const background = 'rgba(' + thisR + ',' + thisG + ',' + thisB + ',' + thisA + ')';
    return background;
  }

  buttonClick(id) {
    console.log('This button was clicked: ');
    console.log(id);

    axios.get('http://localhost:5000/plotbutton/'+id)
      .then(response => {
        this.setState({
          r: response.data.r,
          g: response.data.g,
          b: response.data.b,
          a: response.data.a,
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  divClick(id) {
    console.log("clicked");
    console.log(id);
    const newColor = {
      r: this.state.r,
      g: this.state.g,
      b: this.state.b,
      a: this.state.a,
    }
    console.log(newColor);

    axios.post('http://localhost:5000/plot/update/'+id, newColor)
      //a promise after it's posted, do this
      .then(res => console.log(res.data));

    //refresh page:
    //window.location = '/plot'
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
      return <PlotButton plotbutton={current} buttonStyling={this.buttonStyling} buttonClick={this.buttonClick} deleteButton={this.deleteButton} key={current._id} />
    })
  }

  divList() {
    return this.state.divs.map(current => {
      return <PlotSection plotsection={current} divStyling={this.divStyling} divSizeHeight={this.divSizeHeight} divSizeWidth={this.divSizeWidth} divDisplay={this.divDisplay} divClick={this.divClick} key={current._id} />
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

  handleClear = () => {
    this.setState({
      r: "235",
      g: "235",
      b: "235",
      a: "100",
    });
  }

  render() {

    const clearStyle = {
          backgroundColor: `rgba(235, 235, 235, 100)`,
          color: "black",
          marginLeft: "20px"
        }

    return (
      <div className="container">

        <div className="row">
          <a href="http://localhost:3000/plotbutton">
            <button
              type="button"
              className="btn btn-success"
            >
              New Crop
            </button>
          </a>

          <div>
            <button
              type="button"
              className="btn btn-dark"
              style={clearStyle}
              onClick={this.handleClear}>
              Clear selection
            </button>
          </div>
        </div>

        <br/>

        <div className="row">
          {this.buttonList()}
        </div>

        <br/>

        <div>
          <div className="row">
            <div className="col">
              <h3>Your plot:</h3>
            </div>
            <div className="col">
            <a href="http://localhost:3000/plot">
              <button
                type="button"
                className="btn btn-success"
              >
                Submit changes
              </button>
            </a>
            </div>

          </div>

          <br/>
          {this.divList()}
        </div>

        {/*<form onSubmit={this.onSubmit}>
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
        </form>*/}


      </div>
    )
  }
}
