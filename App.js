import React from "react";
import { firebaseApp5T } from  "./app/utils/firebase";
import { YellowBox } from "react-native";
import Navigation from "./app/navigations/Navigation";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <Navigation />;
}