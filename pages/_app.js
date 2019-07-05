import React from "react";
import App from "next/app";
import StoreContextProvider from "./storeContext";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreContextProvider>
        <Component {...pageProps} />
      </StoreContextProvider>
    );
  }
}

export default MyApp;
