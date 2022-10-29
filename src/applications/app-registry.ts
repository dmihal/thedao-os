import { App } from "./App";
import WelcomeApp from "./Welcome/WelcomeApp";
import * as Applications from "../components/Applications";
import { ComponentType } from "react";
import AnalyticsApp from "./Analytics/AnalyticsApp";

class AppRegistry {
  apps: App[] = [];
  appsByName: { [name: string]: App } = {};

  register(app: App) {
    this.apps.push(app);
    this.appsByName[app.name] = app;
  }

  get(name: string): App | null {
    return this.appsByName[name] || null;
  }
}

const registry = new AppRegistry();

registry.register(new WelcomeApp());
registry.register(new AnalyticsApp());

class LegacyApp implements App {
  name: string;
  Component: ComponentType<{}>;
  
  constructor(name: string, component: ComponentType) {
    this.name = name;
    this.Component = component;
  }
}

Object.entries(Applications).forEach(([name, AppComponent]) => registry.register(new LegacyApp(name, AppComponent)));

export default registry;
