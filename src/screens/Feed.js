import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Alert
} from "react-native";

import CardCell from "../components/CardCell";

import { connect } from "react-redux";

class Feed extends Component {
  state = {
    activitys: []
  };

  static navigationOptions = ({ navigation }) => {
    let headerTitle = "Tarefas";
    let headerRight = (
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.setItem("isLogged", JSON.stringify(false));
          navigation.navigate("Auth");
        }}
        style={styles.buttom}
      >
        <Text style={styles.buttomText}>Logout</Text>
      </TouchableOpacity>
    );
    return {
      headerTitle,
      headerRight
    };
  };

  showAccontableData = index => {
    let accontableIndex = this.props.activitys[index].userId - 1;
    this.props.navigation.navigate(
      "AccontableInformation",
      this.props.accountables[accontableIndex]
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.activitys}
          keyExtractor={item => `${Math.random()}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => this.showAccontableData(index)}>
              <CardCell key={`${Math.random()}`} {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  buttom: {
    marginTop: 5,
    marginRight: 30,
    padding: 5,
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    borderRadius: 10
  },
  buttomText: {
    fontSize: 15,
    color: "#fff"
  }
});

const mapStateToProps = state => ({
  activitys: state.MainReducer.activitys,
  accountables: state.MainReducer.accountables
});

export default connect(
  mapStateToProps,
  null
)(Feed);
