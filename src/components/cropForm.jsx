import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";
import { getCrop, saveCrop } from "../services/cropService";
import { getTypes } from "../services/typeService";

class CropForm extends Form {
  state = {
    data: {
      name: "",
      typeId: "",
      plantSeason: "",
      harvestSeason: "",
      lifeCycle: ""
    },
    types: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    typeId: Joi.string()
      .required()
      .label("Crop Type"),
      plantSeason: Joi.string()
      .required()
      .label("Plant Season"),
      harvestSeason: Joi.string()
      .required()
      .label("Harvest Season")
  };

  async populateTypes() {
    const { data: types } = await axios.get("http://localhost:8080/api/types");
    this.setState({ types });
  }

  async populateCrop() {
    try {
      const cropId = this.props.match.params.id;
      if (cropId === "new") return;

      const { data: crop } = await getCrop(cropId);
      this.setState({ data: this.mapToViewModel(crop) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateTypes();
    await this.populateCrop();
  }

  mapToViewModel(crop) {
    return {
      _id: crop._id,
      name: crop.name,
      typeId: crop.type._id,
      plantSeason: crop.plantSeason,
      harvestSeason: crop.harvestSeason,
      lifeCycle: crop.lifeCycle
    };
  }

  doSubmit = async () => {
    await saveCrop(this.state.data);

    this.props.history.push("/crops");
  };

  render() {
    return (
      <div>
        <h1>Crop Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("typeId", "Crop Type", this.state.types)}
          {this.renderInput("plantSeason", "Plant Season")}
          {this.renderInput("harvestSeason", "Harvest Season")}
          {this.renderInput("lifeCycle", "Life Cycle")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CropForm;
