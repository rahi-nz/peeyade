import React from "react";
import { Button, Table } from "antd";

const A = props => {
  return (
    <div>
      <Button type="primary">{props?.data?.title}</Button>
      <Table columns={[]} dataSource={[]} />
    </div>
  );
};

export default A;
