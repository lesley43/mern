import React from 'react'

class PlotDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '235',
      g: '235',
      b: '235',
      a: '100',
    };
    this.colorPlot = this.colorPlot.bind(this);
  };

  colorPlot = () => {
    let colorChose = this.props.colorChosen;
    let colorR = colorChose.r;
    let colorG = colorChose.g;
    let colorB = colorChose.b;
    let colorA = colorChose.a;
    this.setState({
      r: colorR,
      g: colorG,
      b: colorB,
      a: colorA,
    })
  }

  render() {

        const plotStyle = {
          height: "50px",
          width: "50px",
          border: "2px solid black",
          backgroundColor: `rgba(${ this.state.r }, ${ this.state.g }, ${ this.state.b }, ${ this.state.a })`
        }

    return (
      <div>
        <div
          style={plotStyle}
          onClick={this.colorPlot}>
        </div>
      </div>

    );
  }
}


export default PlotDiv;
