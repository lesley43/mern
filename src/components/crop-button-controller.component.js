import React from 'react';
import CropButton from "./cropButton.js"

class CropButtonController extends React.Component {

  render() {

    const data = this.props.data;
    const newArray = this.props.data.button;

    const mapButton = newArray.map( item => {
      return (
        <div key={item.name}>
          <CropButton
            item={item}
            data={data}
            readyToSet={this.props.readyToSet}
            colorChosen={this.props.colorChosen}
            cropButtonClick={this.props.cropButtonClick} />
        </div>
      )
    })

    return (
      <div>
        {mapButton}
      </div>
    );
  }
}

export default CropButtonController;
