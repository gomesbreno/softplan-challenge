import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Linking,
  TextInput
} from "react-native";

import axios from "axios";
import { connect } from "react-redux";
import { changeAccountableList, changeActivitysList } from "../actions/main";

import KeyboardShift from "../components/KeyboardShift";

import logo from "../images/logo.jpg";
import background from "../images/bg.jpg";

const baseURL = "https://jsonplaceholder.typicode.com";

const loginStateTypes = {
  loginSuccessful: 0,
  emptyName: 1,
  nameWithUpperCase: 2,
  nameWithOnlyBlankSpaces: 3,
  nameWithSpecialCaracteres: 4
};

export class Login extends Component {
  state = {
    name: "",
    isLoading: false,
    hasSucess: true
  };

  componentWillMount() {
    this.verifyUserLogged();
  }

  verifyUserLogged = () => {
    AsyncStorage.getItem("name")
      .then(name => {
        if (name != null) {
          this.setState({ name });
          AsyncStorage.getItem("isLogged")
            .then(data => {
              if (data != null) {
                let isLogged = JSON.parse(data);
                if (isLogged) this.login();
              }
            })
            .done();
        }
      })
      .done();
  };

  verifyInputData = () => {
    let nameWithSpecialCaracteres = /^[a-zA-Z\s]*$/.test(this.state.name);
    if (this.state.name.length === 0) {
      Alert.alert(
        "Digite seu nome",
        "Você precisa digitar seu nome para poder acessar a lista de tarefas."
      );
      return loginStateTypes.emptyName;
    } else if (this.state.name !== this.state.name.toLowerCase()) {
      Alert.alert(
        "Letras maiúscula inserida",
        "Insira seu nome apenas com letras minúsculas"
      );
      return loginStateTypes.nameWithUpperCase;
    } else if (!this.state.name.replace(/\s/g, "").length) {
      Alert.alert("Nome inváido", "foram iseridos apenas espaços");
      return loginStateTypes.nameWithOnlyBlankSpaces;
    } else if (!nameWithSpecialCaracteres) {
      Alert.alert(
        "Nome inváido",
        "não são permitidos caracteres especias no nome."
      );
      return loginStateTypes.nameWithSpecialCaracteres;
    } else {
      this.login();
      return loginStateTypes.loginSuccessful;
    }
  };

  login = () => {
    AsyncStorage.setItem("name", this.state.name);
    this.setState({ isLoading: true });
    let primisse1 = this.getActivitys();
    let promisse2 = this.getAccountables();
    const promisses = [primisse1, promisse2];
    Promise.all(promisses)
      .then(data => {
        if (this.state.hasSucess) {
          AsyncStorage.setItem("isLogged", JSON.stringify(true));
          this.props.navigation.navigate("Content");
        }
      })
      .catch(err => {
        Alert.alert("Erro", "Verifique sua conexão com a internet");
        this.setState({ isLoading: false });
      });
  };

  getActivitys = async () => {
    return axios({
      url: "todos",
      baseURL: baseURL,
      method: "get"
    })
      .then(res => {
        this.setState({ hasSucess: true });
        this.props.changeActivitysList(res.data);
      })
      .catch(err => {
        this.setState({ hasSucess: false });
        this.setState({ isLoading: false });
        Alert.alert("Erro", "Verifique sua conexão com a internet");
      });
  };

  getAccountables = async () => {
    return axios({
      url: "users",
      baseURL: baseURL,
      method: "get"
    })
      .then(res => {
        this.setState({ hasSucess: true });
        this.props.changeAccountableList(res.data);
      })
      .catch(err => {
        this.setState({ hasSucess: false });
        this.setState({ isLoading: false });
        Alert.alert("Erro", "Verifique sua conexão com a internet");
      });
  };

  renderBtnAcessar() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <TouchableOpacity onPress={this.verifyInputData} style={styles.buttom}>
        <Text style={styles.buttomText}>ENTRAR</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <KeyboardShift>
        {() => (
          <ImageBackground source={background} style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.Header}>Lista de tarefas</Text>
              <Text style={styles.Header}>Softplan</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.softplan.com.br/");
              }}
            >
              <Image style={styles.logo} source={logo} />
            </TouchableOpacity>
            <View style={styles.form}>
              <Text style={styles.textName}>Nome</Text>
              <TextInput
                style={styles.custonInput}
                placeholder="Digite seu nome"
                value={this.state.name}
                onChangeText={name => {
                  this.setState({ name });
                }}
              />
              <View style={styles.line} />
              {this.renderBtnAcessar()}
            </View>
          </ImageBackground>
        )}
      </KeyboardShift>
    );
  }
}

/**
 * flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height,
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
 */


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "space-between",
    height: Dimensions.get("window").height * 1.5,
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  logo: {
    width: 200,
    height: 200,
    //borderRadius: 100,    
    marginTop: 20    
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginTop: 50,
    marginBottom: 50
  },
  Header: {
    fontSize: 30,
    color: "#fff"
  }, 
  buttom: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#033686",
    width: "100%",
    alignItems: "center",
    borderRadius: 10
  },
  buttomText: {
    fontSize: 20,
    color: "#fff"
  },  
  form: {    
    width: "80%",
    height: Dimensions.get("window").height / 3,
    borderRadius: 10,
    marginTop: 80
  },  
  textName: {
    fontSize: 15,
    marginLeft: 10
  },  
  custonInput: {
    color: "white",
    width: "100%",
    marginLeft: 10,
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: "white",
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  activitys: state.MainReducer.activitys,
  accountables: state.MainReducer.accountables
});

export default connect(
  mapStateToProps,
  { changeAccountableList, changeActivitysList }
)(Login);
