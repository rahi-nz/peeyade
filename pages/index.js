import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import s from "../scss/index.scss";
import { request } from "../request/request";
import { getCategory } from "../request/services";

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  static async getInitialProps() {
    const response = await request.get(getCategory);
    if (response.ok) {
      return { data: response.data.data };
    }
    return { data: [] };
  }

  render() {
    const { data } = this.props;

    console.log("data:", data);
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
        <div className={s.container}>
          <Table className={s.table} dataSource={data} columns={columns} />
        </div>
      </div>
    );
  }
}

export default Index;
