import React from "react";
import { Table } from "antd";
import { Consumer } from "./storeContext";
import s from "../scss/code.scss";

class List extends React.Component {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "English Name",
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
                <Table dataSource={context.list?.data} columns={columns} />
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default List;
