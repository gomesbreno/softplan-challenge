import React from "react";

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import Login from "./screens/Login";
import Feed from "./screens/Feed";
import AccontableInformation from "./screens/AccontableInformation";

const ActivityRouter = createStackNavigator(
  {
    Feed: { screen: Feed, navigationOptions: { title: "Tarefas" } },
    AccontableInformation: { screen: AccontableInformation, navigationOptions: { title: "Responsável" } }
  },
  {
    initialRouteName: "Feed"
  }
);

const LoginToActivityRouter = createSwitchNavigator(
  {
    Content: ActivityRouter,
    Auth: Login
  },
  {
    initialRouteName: "Auth"
  }
);

class Navigation extends React.Component {
  static router = LoginToActivityRouter.router;
  render() {
    const { navigation } = this.props;
    return <LoginToActivityRouter navigation={navigation} />;
  }
}

export default Navigation;
