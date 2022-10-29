import { App } from "../App";
import AnalyticsComponent from "./AnalyticsComponent";

export default class WelcomeApp implements App {
  name = "Analytics";
  Component = AnalyticsComponent;
}