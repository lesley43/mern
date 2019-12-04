import React from 'react'

class CropButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r: '235',
      g: '235',
      b: '235',
      a: '100',
    };
    this.colorButton = this.colorButton.bind(this);
  };

  colorButton = () => {
    if (this.props.readyToSet === true) {
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
  }

  render() {

    const buttonStyle = {
      backgroundColor: `rgba(${ this.state.r }, ${ this.state.g }, ${ this.state.b }, ${ this.state.a })`
    }

    const data = this.props.data;
    const newArray = this.props.data.button;
    const controllerItem = this.props.item;

    const mapButton = newArray.map(item => {
      if (item === controllerItem) {
        return (
          <button
            key={item.name}
            type="button"
            className="btn btn-light"
            style={buttonStyle}
            onClick={() => {
              this.colorButton();
              this.props.cropButtonClick(this.state.r, this.state.g, this.state.b, this.state.a);
            }}>
            {item.name}
          </button>
        )
      }
    })

    return (
      <div>
        {mapButton}
      </div>

    );
  }
}


export default CropButton;
