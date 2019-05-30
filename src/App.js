import React from "react";
import "./css/App.css";
import TableContainer from "./TableContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("email");
    this.props.history.push({ pathname: "/" });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <i className="fas fa-american-sign-language-interpreting" />
          <span>
            <i className="fas fa-user" />
            {localStorage.getItem("email")}
            <div className="dropdown" onClick={this.logout}>
              <span>Logout</span>
            </div>
          </span>
        </header>
        <TableContainer />
      </div>
    );
  }
}

export default App;
