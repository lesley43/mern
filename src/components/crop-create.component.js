import React from 'react';

export default class CreateCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cropType: "",
      plantSeason: "",
      harvestSeason: "",
      lifeCycle: "",
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCropType = this.onChangeCropType.bind(this);
    this.onChangePlantSeason = this.onChangePlantSeason.bind(this);
    this.onChangeHarvestSeason = this.onChangeHarvestSeason.bind(this);
    this.onChangeLifeCycle = this.onChangeLifeCycle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value  //target is text box, value is whats in it
    });
  }

  onChangeCropType(e) {
    this.setState({
      cropType: e.target.value
    });
  }

  onChangePlantSeason(e) {
    this.setState({
      plantSeason: e.target.value
    });
  }

  onChangeHarvestSeason(e) {
    this.setState({
    harvestSeason: e.target.value
    });
  }

  onChangeLifeCycle(e) {
    this.setState({
      lifeCycle: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault(); //prevents the default action
    const crop = {
      name: this.state.name,
      cropType: this.state.cropType,
      plantSeason: this.state.plantSeason,
      harvestSeason: this.state.harvestSeason,
      lifeCycle: this.state.lifeCycle,
    }
    console.log(crop);

    //this will take people back to the homepage after submitting
    //window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create new Crop</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Crop Name</label>
          <input
            type="text"
            required
            className="form-control"
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </div>
          <div className="form-group">
            <label>Crop Type</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.cropType}
              onChange={this.onChangeCropType}
            />
          </div>
          <div className="form-group">
            <label>Plant Season</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.plantSeason}
              onChange={this.onChangePlantSeason}
            />
          </div>
          <div className="form-group">
            <label>Harvest Season</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.harvestSeason}
              onChange={this.onChangeHarvestSeason}
            />
          </div>
          <div className="form-group">
            <label>Life-Cycle</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.lifeCycle}
              onChange={this.onChangeLifeCycle}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Crop"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    )
  }
}
