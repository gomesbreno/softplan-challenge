import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import { connect } from "react-redux";

import user from "../images/user.png";
import email from "../images/email.png";
import phone from "../images/phone.png";
import pin from "../images/pin.png";
class AccontableInformation extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.navigation.state.params);
    this.setState({ accontable: this.props.navigation.state.params });
  }

  openGoogleMaps = () => {
    let lat = this.props.navigation.state.params.address.geo.lat;
    let lng = this.props.navigation.state.params.address.geo.lng;
    let url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Não foi possivel abrir o Google maps");
      }
    });
  };

  render() {
    const accontable = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.rowContainer}>
              <Image style={styles.icon} source={user} />
              <Text style={styles.text}>{accontable.name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image style={styles.emailIcon} source={email} />
              <Text style={styles.emailEndPhoneText}>{accontable.email}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image style={styles.phoneIcon} source={phone} />
              <Text style={styles.emailEndPhoneText}>{accontable.phone}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Image style={styles.pinIcon} source={pin} />
              <Text style={styles.adressText}>
                {`${accontable.address.street},${accontable.address.suite}, ${accontable.address.city}, ${accontable.address.zipcode}`}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  region={{
                    latitude: parseFloat(accontable.address.geo.lat),
                    longitude: parseFloat(accontable.address.geo.lng),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(accontable.address.geo.lat),
                      longitude: parseFloat(accontable.address.geo.lng)
                    }}
                    title="Localização"
                    description=" do responsável"
                  ></Marker>
                </MapView>
              </View>
            </View>
            <View style={styles.buttomContainer}>
              <TouchableOpacity
                onPress={this.openGoogleMaps}
                style={styles.buttom}
              >
                <Text style={styles.buttomText}>Abrir mapa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  contentContainer: {
    width: Dimensions.get("window").width,
    backgroundColor: "white"
  }, 
  mapContainer: {
    height: 200,
    width: "100%",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "96%"
  },
  rowContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width
  },
  icon: {
    margin: 15,
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  emailIcon: {
    margin: 6,
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  phoneIcon: {
    marginLeft: 10,
    marginRight: 2,
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  pinIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  text: {
    fontSize: 25,
    color: "#000",
    flex: 1
  },
  emailEndPhoneText: {
    fontSize: 20,
    color: "#000",
    flex: 1
  },
  adressText: {
    fontSize: 15,
    color: "#000",
    flex: 1
  },
  buttom: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#033686",
    width: "80%",
    alignItems: "center",
    borderRadius: 10
  },
  buttomContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 200
  },
  buttomText: {
    fontSize: 20,
    color: "#fff"
  }
});

const mapStateToProps = state => ({
  accountables: state.MainReducer.accountables
});

export default connect(
  mapStateToProps,
  null
)(AccontableInformation);
