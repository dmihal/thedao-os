import { App } from "../App";
import WelcomeComponent from "./WelcomeComponent";

export default class WelcomeApp implements App {
  name = "Welcome";
  Component = WelcomeComponent;
}