import React, { Component } from "react";
import "./css/ModalBody.css";

class ModalBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPermissionsList: [
        "Travel",
        "Rule Class",
        "Travel Policy",
        "Policy Violations Reason",
        "Travel Rule",
        "Travel Vendor Exclusion",
        "Travel Discount",
        "Contracts",
        "Vendor Discount",
        "Vendor Rule"
      ],
      grantedPermissionsList: [],
      queriedAllPermissionsList: [],
      queriedgrantedPermissionsList: [],
      selectedPermissionsInAll: [],
      selectedPermissionsInGranted: []
    };
  }

  handleAllPermissionsSearch(e) {
    let list = [];
    if (e.target.value.length > 0) {
      this.state.allPermissionsList.forEach(name => {
        if (name.search(e.target.value) > -1) {
          list.push(name);
        }
      });
      this.setState({ queriedAllPermissionsList: list });
    } else
      this.setState({
        queriedAllPermissionsList: []
      });
  }

  handleGrantedPermissionsSearch(e) {
    let list = [];
    if (e.target.value.length > 0) {
      this.state.grantedPermissionsList.forEach(name => {
        if (name.search(e.target.value) > -1) {
          list.push(name);
        }
      });

      this.setState({ queriedgrantedPermissionsList: list });
    } else
      this.setState({
        queriedgrantedPermissionsList: []
      });
  }

  onDrop(e, type) {
    let permissionName = e.dataTransfer.getData("permissionName");
    if (type === "GrantedPermissions") {
      let grantedPermissionsList = [...this.state.grantedPermissionsList];
      let index = grantedPermissionsList.indexOf(permissionName);
      if (index === -1) {
        grantedPermissionsList.push(permissionName);
      }
      this.setState({ grantedPermissionsList: grantedPermissionsList });
    } else if (type === "AllPermissions") {
      let grantedPermissionsList = [...this.state.grantedPermissionsList];
      let index = grantedPermissionsList.indexOf(permissionName);
      grantedPermissionsList.splice(index, 1);
      this.setState({ grantedPermissionsList: grantedPermissionsList });
    }
  }

  onDragStart(e, permissionName) {
    console.log("permissionName", permissionName);
    e.dataTransfer.setData("permissionName", permissionName);
  }

  generateDraggableList(list, type) {
    let tempList = [];
    list.forEach(element => {
      tempList.push(
        <div
          onDragStart={e => this.onDragStart(e, element)}
          draggable
          key={element}
          onClick={this.handleClick.bind(this, element, type)}
          className={
            type === "all" &&
            this.state.selectedPermissionsInAll.includes(element)
              ? "draggable-selected"
              : type === "granted" &&
                this.state.selectedPermissionsInGranted.includes(element)
              ? "draggable-selected-delete"
              : ""
          }
        >
          <span>{element}</span>
        </div>
      );
    });
    return tempList;
  }

  handleClick(name, type) {
    console.log("Handle Click Called ", name, type);
    let list = [];
    if (type === "all") {
      list = [...this.state.selectedPermissionsInAll];
      if (list.includes(name)) {
        let i = list.indexOf(name);
        list.splice(i, 1);
      } else {
        list.push(name);
      }
      this.setState({ selectedPermissionsInAll: list });
    } else if (type === "granted") {
      list = [...this.state.selectedPermissionsInGranted];
      if (list.includes(name)) {
        let i = list.indexOf(name);
        list.splice(i, 1);
      } else {
        list.push(name);
      }
      this.setState({ selectedPermissionsInGranted: list });
    }
    console.log("Exitting handle click", this.state, this.className);
  }

  grantSelectedPermissions() {
    let list = [...this.state.grantedPermissionsList];
    this.state.selectedPermissionsInAll.forEach(name => {
      if (!list.includes(name)) list.push(name);
    });
    this.setState({
      grantedPermissionsList: list,
      selectedPermissionsInAll: []
    });
  }

  revokeSelectedPermissions() {
    let list = [...this.state.grantedPermissionsList];
    this.state.selectedPermissionsInGranted.forEach(name => {
      let i = list.indexOf(name);
      list.splice(i, 1);
    });
    this.setState({
      grantedPermissionsList: list,
      selectedPermissionsInGranted: []
    });
  }

  handleSelectAll(type) {
    if (type === "all")
      this.setState({
        selectedPermissionsInAll: this.state.allPermissionsList
      });
    else if (type === "granted")
      this.setState({
        selectedPermissionsInGranted: this.state.grantedPermissionsList
      });
  }

  render() {
    let allPermissionsList = this.generateDraggableList(
      this.state.allPermissionsList,
      "all"
    );
    let grantedPermissionsList = this.generateDraggableList(
      this.state.grantedPermissionsList,
      "granted"
    );
    let queriedAllPermissionsList = this.generateDraggableList(
      this.state.queriedAllPermissionsList,
      "all"
    );
    let queriedgrantedPermissionsList = this.generateDraggableList(
      this.state.queriedgrantedPermissionsList,
      "granted"
    );

    return (
      <div className="modal-body">
        <div className="username">
          <span>{this.props.name}</span>
        </div>
        <div className="all-permissions">
          <i className="fas fa-search" />
          <input
            type="text"
            onChange={this.handleAllPermissionsSearch.bind(this)}
            placeholder="Search Permissions"
          />
          <span onClick={this.handleSelectAll.bind(this, "all")}>
            Select All
          </span>
          <div
            onDrop={e => this.onDrop(e, "AllPermissions")}
            onDragOver={e => {
              e.preventDefault();
            }}
          >
            {this.state.queriedAllPermissionsList.length === 0
              ? allPermissionsList
              : queriedAllPermissionsList}
          </div>
        </div>
        <div className="arrow-buttons">
          <span>
            <i
              className="material-icons"
              onClick={this.grantSelectedPermissions.bind(this)}
            >
              play_arrow
            </i>
          </span>
          <span>
            <i
              className="material-icons"
              onClick={this.revokeSelectedPermissions.bind(this)}
            >
              play_arrow
            </i>
          </span>
        </div>
        <div className="grated-permissions">
          <i className="fas fa-search" />
          <input
            type="text"
            onChange={this.handleGrantedPermissionsSearch.bind(this)}
            placeholder="Search Permissions"
          />
          <span onClick={this.handleSelectAll.bind(this, "granted")}>
            Select All
          </span>
          <div
            onDrop={e => this.onDrop(e, "GrantedPermissions")}
            onDragOver={e => {
              e.preventDefault();
            }}
          >
            {this.state.queriedgrantedPermissionsList.length === 0
              ? grantedPermissionsList
              : queriedgrantedPermissionsList}
          </div>
        </div>
      </div>
    );
  }
}

export default ModalBody;
