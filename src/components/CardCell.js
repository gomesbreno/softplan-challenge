import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";

import user from "../images/user.png";
import check from "../images/check.png";
import separator from "../images/separador.png";

import { connect } from "react-redux";

class CardCell extends Component {
  renderCheck = () => {
    if (this.props.completed) {
      return <Image style={styles.checkImage} source={check} />;
    }
    return <View />;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.textTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image style={styles.userImage} source={user} />

              <Text style={styles.textAccountableName}>
                {this.props.accountables[this.props.userId - 1].name}
              </Text>
            </View>
          </View>
          <View style={styles.checkStatus}>{this.renderCheck()}</View>
        </View>
        <Image style={styles.separator} source={separator} />
      </View>
    );
  }
}
//<Image source={this.props.image} style={styles.image}/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#FFF",
    width: Dimensions.get("window").width,
    justifyContent: "center"
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkStatus: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  titleContainer: {
    width: "75%"
  },
  userImage: {
    width: 25,
    height: 25,    
  },
  checkImage: {
    width: 50,
    height: 50,
    marginRight: 10
    //position: "absolute",
    //right: 0,
    //marginLeft: 10
    //textAlign: 'right'
  },
  image: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 3) / 4,
    resizeMode: "contain"
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    //justifyContent: "space-around",
    alignItems: "center"
  },
  textTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  textAccountableName: {
    marginLeft: 10,
    fontSize: 20
  },
  separator: {
    width: Dimensions.get("window").width,
    height: 15
  }
});

const mapStateToProps = state => ({
  accountables: state.MainReducer.accountables
});

export default connect(
  mapStateToProps,
  null
)(CardCell);
