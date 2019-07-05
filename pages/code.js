import React from "react";
import Router from "next/router";
import Link from "next/link";
import { request } from "../request/request";
import { Consumer } from "./storeContext";
import s from "../scss/code.scss";
import { coderPost, getCategory } from "../request/services";
import { setCookie } from "../utils";

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

  changePhone = () => {
    Router.push("/login");
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
      request.setHeader({
        Authorization: `Bearer${resp.data.data.oAuth2.accessToken}`
      });
      setCookie("Authorization", `Bearer${resp.data.data.oAuth2.accessToken}`);
      setCookie("refreshToken", resp.data.data.oAuth2.refreshToken);
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
                  <button type="submit">ثبت</button>
                  <Link href="/login" as="/login">
                    <a>تغییر شماره تماس</a>
                  </Link>
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
