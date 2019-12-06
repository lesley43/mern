import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class CropsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: crop => <Link to={`/crops/${crop._id}`}>{crop.name}</Link>
    },
    { path: "type.name", label: "Crop Type" },
    { path: "plantSeason", label: "Plant Season" },
    { path: "harvestSeason", label: "Harvest Season" },
    { path: "lifeCycle", label: "Life Cycle" },
    {
      key: "like",
      content: crop => (
      <Like liked={crop.liked} onClick={() => this.props.onLike(crop)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: crop => (
      <button
        onClick={() => this.props.onDelete(crop)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }  
    
  render() { 
    const { crops, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={crops}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );        
  }
}
  
export default CropsTable;
