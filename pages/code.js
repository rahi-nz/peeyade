import React from "react";
import Router from "next/router";
import { request } from "../request/request";
import { Consumer } from "./storeContext";
import s from "../scss/code.scss";
import { coderPost, getCategory } from "../request/services";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      error: null
    };
  }

  handleChange = e => {
    this.setState({
      code: e.target.value
    });
  };

  submit = async (e, context) => {
    e.preventDefault();
    const { code } = this.state;
    const body = {
      phone: context.user,
      code
    };
    const resp = await request.post(coderPost, body);
    if (resp.data.meta.status === 200) {
      const list = await request.get(getCategory);
      context.changeList(list.data);
      Router.push("/list");
    } else {
      this.setState({
        error: resp.data.notification.message
      });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <Consumer>
          {context => {
            console.log("context:", context);
            return (
              <div className={s.container}>
                <form onSubmit={e => this.submit(e, context)}>
                  <input
                    type="text"
                    maxLength="4"
                    onChange={this.handleChange}
                  />
                  <button type="submit">Submit</button>
                  {error && <p>{error}</p>}
                </form>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Verification;
