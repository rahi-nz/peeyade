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
      otp: {},
      changeOtp: otp => this.setState({ otp })
    };
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
export default StoreContextProvider;
