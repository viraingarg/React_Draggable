import React, { Component } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import Rodal from "rodal";
import ModalBody from "./ModalBody";
import "rodal/lib/rodal.css";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRows: [],
      currentRows: [],
      errorMessage: "",
      loading: true,
      activePage: 1,
      itemsCountPerPage: 3,
      totalItemsCount: "",
      query: "",
      visible: false,
      modalUser: ""
    };
    this.sortingType = "ascending";
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        console.log("Success response from Api ", response);
        this.setState({
          allRows: response.data,
          errorMessage: "",
          loading: false,
          totalItemsCount: response.data.length
        });
        this.getRowsData(1);
      })
      .catch(error => {
        console.log("Error response from Api", error.response);
        this.setState({
          allRows: [],
          errorMessage: "Unable to fetch data, please try later.",
          loading: false
        });
      });
  }

  handleSelect(event) {
    this.setState({ itemsCountPerPage: event.target.value }, () => {
      this.getRowsData(this.state.activePage);
    });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.getRowsData(pageNumber);
  }

  getRowsData(pageNumber) {
    let rows = [];
    let tempArray = [...this.state.allRows];
    let ul = pageNumber * this.state.itemsCountPerPage;
    let ll = (pageNumber - 1) * this.state.itemsCountPerPage;
    if (ul < tempArray.length) {
      rows = tempArray.slice(ll, ul);
    } else if (ul >= tempArray.length) {
      rows = tempArray.slice(ll);
    }
    this.setState({ currentRows: rows });
  }

  handleSearchChange(e) {
    this.setState({ query: e.target.value });
    let rows = [];
    if (e.target.value.length > 0) {
      this.state.allRows.forEach(row => {
        if (row.name.search(e.target.value) > -1) {
          rows.push(row);
        }
      });
      this.setState({ currentRows: rows });
    } else this.getRowsData(this.state.activePage);
  }

  sort(attribute) {
    let tempArray = [...this.state.allRows];
    if (this.sortingType === "ascending") {
      tempArray.sort((a, b) => {
        if (attribute === "company")
          return a.company.name >= b.company.name ? 1 : -1;
        else return a[attribute] >= b[attribute] ? 1 : -1;
      });
      this.sortingType = "descending";
    } else {
      tempArray.sort((a, b) => {
        if (attribute === "company")
          return a.company.name <= b.company.name ? 1 : -1;
        else return a[attribute] <= b[attribute] ? 1 : -1;
      });
      this.sortingType = "ascending";
    }
    this.setState({ allRows: tempArray }, () => {
      this.getRowsData(this.state.activePage);
    });
  }

  show(name) {
    this.setState({ visible: true, modalUser: name });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    let tableBody = [];
    this.state.currentRows.forEach(row => {
      tableBody.push(
        <tr key={row.id}>
          <td>
            <span className="link" onClick={this.show.bind(this, row.name)}>
              {row.name}
            </span>
            <span>{row.email}</span>
          </td>
          <td>{row.phone}</td>
          <td>{row.username}</td>
          <td>{row.company.name}</td>
        </tr>
      );
    });
    return (
      <div className="body">
        <div className="searchbar">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleSearchChange}
            placeholder="Search"
          />
          <i className="fas fa-search" />
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  FULL NAME{" "}
                  <i
                    className="material-icons"
                    onClick={this.sort.bind(this, "name")}
                  >
                    arrow_drop_down
                  </i>
                </th>
                <th>
                  PHONE{" "}
                  <i
                    className="material-icons"
                    onClick={this.sort.bind(this, "phone")}
                  >
                    arrow_drop_down
                  </i>
                </th>
                <th>
                  USER NAME{" "}
                  <i
                    className="material-icons"
                    onClick={this.sort.bind(this, "username")}
                  >
                    arrow_drop_down
                  </i>
                </th>
                <th>
                  COMPANY NAME{" "}
                  <i
                    className="material-icons"
                    onClick={this.sort.bind(this, "company")}
                  >
                    arrow_drop_down
                  </i>
                </th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
        <div className="pagination-container">
          <div className="row-count">
            <label htmlFor="items">Items</label>
            <select
              id="items"
              value={this.state.itemsCountPerPage}
              onChange={this.handleSelect}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>
          <div className="pagination">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsCountPerPage}
              totalItemsCount={this.state.totalItemsCount}
              pageRangeDisplayed={3}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
        <Rodal
          visible={this.state.visible}
          onClose={this.hide.bind(this)}
          measure="%"
          width={70}
          height={60}
        >
          {this.state.visible ? (
            <ModalBody name={this.state.modalUser} />
          ) : null}
        </Rodal>
      </div>
    );
  }
}

export default TableContainer;
