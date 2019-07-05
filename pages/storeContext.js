import React, { createContext, Component } from "react";
import PropTypes from "prop-types";

export const { Provider, Consumer } = createContext({});

class StoreContextProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      list: null,
      otp: {},
      changeOtp: otp => this.setState({ otp }),
      changeUser: user => this.setState({ user }),
      changeList: list => this.setState({ list })
    };
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
export default StoreContextProvider;
