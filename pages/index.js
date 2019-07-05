import React from "react";
import Link from "next/link";
import { Button } from "antd";

export default () => (
  <ul>
    <li>
      <Link href="/a" as="/a">
        <a>a</a>
      </Link>
    </li>
    <li>
      <Link href="/login" as="/login">
        <a>login</a>
      </Link>
    </li>
    <li>
      <Link href={{ pathname: "/posts", query: { id: "2" } }} as="/posts/2">
        <a>post #2</a>
      </Link>
    </li>
    <Button>Hello</Button>
  </ul>
);
