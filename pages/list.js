import React from "react";
import { Table } from "antd";
import { Consumer } from "./storeContext";
import s from "../scss/code.scss";
import {request} from "../request/request";
import {phoneNumberPost} from "../request/services";
import Router from "next/dist/client/router";

class Verification extends React.Component {


  getlist = async context => {
    const { phone } = this.state;
    const body = {
      phone
    };
    const resp = await request.post(phoneNumberPost, body);
    console.log("resp:", resp);
    if (resp.data.meta.status === 200) {
      context.changeOtp(resp.data);
      Router.push("/code");
    } else {
      this.setState({
        error: resp.data.notification.message
      });
    }
  };
  render() {
    const columns = [
      {
        title: "_id",
        dataIndex: "_id",
        key: "_id"
      },
      {
        title: "parent",
        dataIndex: "parent",
        key: "parent"
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "en_name",
        dataIndex: "en_name",
        key: "en_name"
      }
    ];
    return (
      <div>
        <Consumer>
          {context => {
            console.log("context:", context);
            return (
              <div className={s.container}>
                <Table dataSource={context.data} columns={columns} />;
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Verification;
