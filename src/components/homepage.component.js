import React from 'react';
import veggie from '../assets/veggies.jpg';

export default class CropList extends React.Component {
  render() {

    const styles = {
      width: '150%',
    }

    const button = {
      position: 'absolute',
      top: '65%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      msTransform: 'translate(-50%, -50%)',
      backgroundColor: 'darkGreen',
      color: 'white',
      fontSize: '16px',
      padding: '12px 24px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '5px',
      textAlign: 'center',
      width: '200px',
      fontSize: 'x-large'
    }

    const name = {
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '6em',
      color: 'black',
    }

    const small = {
      position: 'absolute',
      top: '43%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '2em',
      color: 'black',
    }

    return (
      <div style={{marginTop: '-8%', width: '100%', marginLeft: '-25%'}}>
        <img
          src={veggie}
          style={styles}
        />
        <div style={name}>The Pocket Plot</div>
        <div style={small}>what will you grow?</div>

        <a href="http://localhost:3000/crops">
          <button
            class="btn"
            style={button}
          >start growing</button>
        </a>
      </div>
    )
  }
}
