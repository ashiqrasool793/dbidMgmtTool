/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import { connect } from 'react-redux';
import * as actions from '../actions';

import LoginForm from "views/Login"
import ErrorBar from "components/SnackBar/SnackBar"


import routes from "routes.js";


var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "green",
      activeColor: "info"
    };
    this.setMainPanelRef = this.setMainPanelRef.bind(this);

  }

  setMainPanelRef(element) {
    this.mainPanelRef = element;
    if (navigator.platform.indexOf("Win") > -1 && element) {
      ps = new PerfectScrollbar(element.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      //this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  loginUser = (email, password) => {
    console.log(email + "<<<HERE")
    this.props.loginUser(email, password)
  }

  render() {
    if(this.props.user) {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={'green'}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.setMainPanelRef}>
          <DemoNavbar {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
        :
      </div>
    ); 
  }
  else {
    return (
      <div>
    <LoginForm errorLogin={this.props.error} loginUser={this.loginUser} />
    </div>
    )
  }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authDetails.loading,
    error: state.authDetails.error,
    user: state.authDetails.user
  };
};


export default connect(mapStateToProps, actions)(Dashboard);