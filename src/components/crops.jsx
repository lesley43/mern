import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CropsTable from "./cropsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getCrops, deleteCrop } from "../services/cropService";
import { getTypes } from "../services/typeService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import axios from "axios";

class Crops extends Component {
  state = {
    crops: [],
    types: [],
    currentPage: 1,
    pageSize: 12,
    searchQuery: "",
    selectedType: null,
    sortColumn: { path: "name", order: "asc" }
  };

  // async componentDidMount() {
  //   const { data } = await getTypes();
  //   const types = [{ _id: "", name: "All Crop Types" }, ...data];

  //   const { data: crops } = await getCrops();
  //   this.setState({ crops, types });
  // }

  componentDidMount() {
    axios.get('http://localhost:5000/crops')
      .then(response => {
        this.setState({ crops: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/types')
       .then(response => {
         this.setState({ types: response.data })
       })
       .catch((error) => {
         console.log(error);
       })
  }

  handleDelete = async crop => {
    const originalCrops = this.state.crops;
    const crops = originalCrops.filter(c => c._id !== crop._id);
    this.setState({ crops });

    try {
      await deleteCrop(crop._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This crop has already been deleted.");

      this.setState({ crops: originalCrops });
    }
  };

  handleLike = crop => {
    const crops = [...this.state.crops];
    const index = crops.indexOf(crop);
    crops[index] = { ...crops[index] };
    crops[index].liked = !crops[index].liked;
    this.setState({ crops });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleTypeSelect = type => {
    this.setState({ selectedType: type, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedType,
      searchQuery,
      crops: allCrops
    } = this.state;

    let filtered = allCrops;
    if (searchQuery)
      filtered = allCrops.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allCrops.filter(c => c.type._id === selectedType._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const crops = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: crops };
  };

  render() {
    const { length: count } = this.state.crops;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no crops in the database.</p>;

    const { totalCount, data: crops } = this.getPagedData();

    return (
      <div className="row">
        {/*}<div className="col-3">
          <ListGroup
            items={this.state.types}
            selectedItem={this.state.selectedType}
            onItemSelect={this.handleTypeSelect}
          />
        </div>*/}
        <div className="col">
          {user && (
            <Link
              to="/crops/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Crop
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CropsTable
            crops={crops}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Crops;
