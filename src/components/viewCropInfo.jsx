import React from 'react';

class ViewCropInfo extends React.Component {
  render() {
    const { data, selectedCrop } = this.props;
    const selected = data[selectedCrop];
  
    return(
        <div>
            <p>{' '}<i>Click on a crop name to view more information</i></p>
            {selected.name &&
                <tr>
                    <td><b>Name:</b></td>
                    <td>{selected.name}</td>
                </tr>
            }
            {selected.type &&
                <tr>
                <td><b>Crop Type:</b></td>
                <td>{selected.type}</td>
                </tr>

            }
            {selected.plantSeason &&
                <tr>
                <td><b>Plant Season:</b></td>
                <td>{selected.plantSeason}</td>
                </tr>
            }
            {selected.harvestSeason &&
                <tr>
                <td><b>Harvest Season:</b></td>
                <td>{selected.harvestSeason}</td>
                </tr>
            }
            {selected.lifeCycle &&
                <tr>
                <td><b>Life Cycle:</b></td>
                <td>{selected.lifeCycle}</td>
                </tr>
            }        
        </div>
    )
  }
}
// crop name
// crop type
//plant season
// harvest season
// life cycle
//extra in cabbage

export default ViewCropInfo;
