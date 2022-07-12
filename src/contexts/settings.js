import React, { Component } from "react";
import bgImg from "../data/images/background-compressed.jpg";
import { SettingsContext } from ".";

const toggle = (dis, key) => () => {
  dis.setState(state => ({ [key]: !state[key] }));
};

const setKeyValue = (dis, key) => val => {
  dis.setState(state => ({ [key]: val }));
};

const isClient = typeof window !== 'undefined'

class SettingsProvider extends Component {
  state = {
    scale: 1,
    crt: false,
    fullScreen: true,
    isMobile: false,
    bgImg: null,
    bgColor: (isClient && window.localStorage.getItem("bgColor")) || "#fff",
    bgStyle: (isClient && window.localStorage.getItem("bgStyle")) || "stretch"
  };

  toggleCrt = toggle(this, "crt");
  toggleFullScreen = toggle(this, "fullScreen");
  toggleMobile = toggle(this, "isMobile");
  changeScale = setKeyValue(this, "scale");

  updateLocalStorage = (key, val) => {
    if (isClient && window.localStorage) {
      window.localStorage.setItem(key, val);
      if (val) {
        this.setState({ [key]: val });
      }
    }
  };
  removeLocalStorage = key => {
    let keys = key;
    if (!Array.isArray(key)) {
      keys = [key];
    }
    if (keys.length < 1) {
      return;
    }
    if (isClient && window.localStorage) {
      keys.map(k => window.localStorage.removeItem(k));

      this.setState(
        keys.reduce(
          (acc, val) => ({
            ...acc,
            [val]: null
          }),
          {}
        )
      );
    }
  };

  componentDidMount() {
    this.setState({
      bgImg: window.localStorage.getItem("bgImg") || !window.localStorage.getItem("loggedIn") && bgImg.src,
      bgColor: window.localStorage.getItem("bgColor") || "#fff",
      bgStyle: window.localStorage.getItem("bgStyle") || "stretch",
    });
  }

  render() {
    const {
      changeScale,
      toggleCrt,
      toggleFullScreen,
      toggleMobile,
      updateLocalStorage,
      removeLocalStorage
    } = this;
    const context = {
      ...this.state,
      changeScale,
      toggleCrt,
      toggleFullScreen,
      toggleMobile,
      updateLocalStorage,
      removeLocalStorage
    };
    return (
      <SettingsContext.Provider value={context}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;
