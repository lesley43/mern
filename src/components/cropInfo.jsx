import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Crop = props => (
  <tr>
    <td>{props.crop.name}</td>
    <td>{props.crop.type.name}</td>
    {/* <td>{props.crop.plantSeason}</td>
    <td>{props.crop.harvestSeason}</td>
    <td>{props.crop.lifeCycle}</td> */}
    <td>
      <Link to={"/edit/"+props.crop._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCrop(props.crop._id) }}>delete</a>
    </td>
  </tr>
)

export default class CropList extends Component {
  constructor(props) {
    super(props);

    this.deleteCrop = this.deleteCrop.bind(this);

    this.state = {
      crops: [],
      types: [],
      cropInfo: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/crops/')
      .then(response => {
        this.setState({ crops: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   const crops = [...this.state.crops];
  //    const index = crops.indexOf(crop);
  //    crops[index] = { ...crops[index] };
  //    this.props.crop.forEach( (info) => {
  //      console.log(info);
  //    }
  // }

  

  deleteCrop(id) {
    axios.delete('http://localhost:5000/crops/'+id)
      .then(res => console.log(res.data));

    this.setState({
      crops: this.state.crops.filter(element => element._id !== id)
    })  
  }

  cropList() {
    return this.state.crops.map(currentCrop => {
      return <Crop crop={currentCrop} deleteCrop={this.deleteCrop} key={currentCrop._id} />;
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Crop Type</th>
              </tr>
            </thead>
            <tbody>
              { this.cropList() }
            </tbody>
          </table>
        </div>
        <div className="column2">
          <div className="card card-col-2">
            <div className="card-body card-listing">
              <h3 className="card-title">Crop Information</h3>
                  
            </div>
          </div>  
        </div>
      </div>
    )
  }
}

// <div className="col">
// <table className="table">
//   <thead className="thead-light">
//     <tr>
//       <th>Name</th>
//       <th>Crop Type</th>
//       <th>Plant Season</th>
//       <th>Harvest Season</th>
//       <th>Life Cycle</th>
//     </tr>
//   </thead>
//   <tbody>
//     { this.cropList() }
//   </tbody>
// </table>
// </div>
