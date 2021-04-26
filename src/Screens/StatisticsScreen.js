import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import ArrowIcon from "react-native-vector-icons/FontAwesome";
import RefreshIcon from "react-native-vector-icons/FontAwesome";
import BackIcon from "react-native-vector-icons/Ionicons";
import { ListItem, Avatar } from "react-native-elements";

export default class StatisticsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RefreshingText: "Click To Refresh",
      // for india
      Confirmed: "",
      Deaths: "",
      Recovered: "",
      Active: "",
      Serious: "",

      // for global
      ConfirmedGlobal: "",
      DeathsGlobal: "",
      RecoveredGlobal: "",
      ActiveGlobal: "",
      SeriousGlobal: "",

      ModalVisible: false,

      // covid data of all countries
      AllCountriesCovidData: [],
    };
  }

  // This is the India's covid Data
  getCovidDataForIndia = async () => {
    try {
      this.setState({ RefreshingText: "Refreshing..." });
      var req = await fetch("https://disease.sh/v3/covid-19/countries/india");
      var res = await req.json();
      this.setState({
        Confirmed: res.cases,
        Deaths: res.deaths,
        Recovered: res.recovered,
        Active: res.active,
        Serious: res.critical,
      });

      setTimeout(() => {
        this.setState({ RefreshingText: "Click To Refresh" });
      }, 1000);
    } catch (err) {
      alert(err);
    }
  };

  // This is the all over global data
  getCovidDataGlobal = async () => {
    try {
      this.setState({ RefreshingText: "Refreshing..." });
      var req = await fetch("https://disease.sh/v3/covid-19/all");
      var res = await req.json();
      this.setState({
        ConfirmedGlobal: res.cases,
        DeathsGlobal: res.deaths,
        RecoveredGlobal: res.recovered,
      });

      setTimeout(() => {
        this.setState({ RefreshingText: "Click To Refresh" });
      }, 1000);
    } catch (err) {
      alert(err);
    }
  };

  // This is the all Countries Covid Data

  getCovidDataForAllCountries = async () => {
    try {
      var req = await fetch("https://disease.sh/v3/covid-19/countries");
      var res = await req.json();
      this.setState({ AllCountriesCovidData: res });
    } catch (err) {
      alert(err);
    }
  };

  componentDidMount() {
    this.getCovidDataForIndia();
    this.getCovidDataGlobal();
    this.getCovidDataForAllCountries();
  }

  showModal = () => (
    <Modal animationType="fade" visible={this.state.ModalVisible}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BackIcon
            name="chevron-back-circle-outline"
            color="black"
            size={40}
            style={{ margin: 10 }}
            onPress={() => this.setState({ ModalVisible: false })}
          />

          <View style={{ marginRight: "30%" }}>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: "#213ca3" }}
            >
              Covid-19 Global Stats
            </Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: "center",
            width: "90%",
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#002097",
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={{ color: "#cbdefc", marginVertical: 5, fontSize: 15 }}>
              Confirmed
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {!this.state.ConfirmedGlobal
                ? "Loading..."
                : this.state.ConfirmedGlobal}
            </Text>
          </View>
          <View>
            <Text style={{ color: "#cbdefc", marginVertical: 5, fontSize: 15 }}>
              Recovered
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {!this.state.RecoveredGlobal
                ? "Loading..."
                : this.state.RecoveredGlobal}
            </Text>
          </View>
          <View>
            <Text style={{ color: "#cbdefc", marginVertical: 5, fontSize: 15 }}>
              Deaths
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              {!this.state.DeathsGlobal
                ? "Loading..."
                : this.state.DeathsGlobal}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 15,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "bold" }}>
            Countries
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "63%",
            }}
          >
            <Text style={styles.ModalCountriesRecoveredEtcTextStyle}>
              Total Cases
            </Text>
            <Text style={styles.ModalCountriesRecoveredEtcTextStyle}>
              Recovered
            </Text>
            <Text style={styles.ModalCountriesRecoveredEtcTextStyle}>
              Deaths
            </Text>
          </View>
        </View>

        {/*  List of countries  */}
        <FlatList
          data={this.state.AllCountriesCovidData}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={7}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <Avatar source={{ uri: item.countryInfo.flag }} />
              <ListItem.Content>
                <ListItem.Title>{item.country}</ListItem.Title>
                <ListItem.Subtitle>{item.countryInfo.iso2}</ListItem.Subtitle>
              </ListItem.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "55%",
                }}
              >
                <Text>{item.cases}</Text>
                <Text>{item.recovered}</Text>
                <Text>{item.deaths}</Text>
              </View>
            </ListItem>
          )}
          keyExtractor={(item) => item.country}
          onEndReachedThreshold={0.7}
        />
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View style={styles.mainView}>
          {/* Heading */}
          <View style={{ marginTop: 33, marginLeft: 30 }}>
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
              Statistics -
            </Text>
          </View>

          {/* flex box */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* My Country Heading */}
            <View
              style={{
                marginTop: 33,
                backgroundColor: "#4D79FF",
                width: 150,
                paddingVertical: 5,
                marginLeft: 25,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                India
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.getCovidDataForIndia();
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 10,
                  backgroundColor: "#FFE5EE",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <RefreshIcon name="refresh" size={30} color="#000" />
                <Text
                  style={{ textAlign: "center", color: "#000", fontSize: 15 }}
                >
                  {this.state.RefreshingText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              margin: 30,
            }}
          >
            <View style={[styles.boxRow1, { backgroundColor: "#FFB259" }]}>
              <Text style={{ color: "#fff", margin: 15, fontSize: 18 }}>
                Confirmed
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  margin: 13,
                  fontWeight: "bold",
                }}
              >
                {!this.state.Confirmed ? "Loading..." : this.state.Confirmed}
              </Text>
            </View>
            <View style={[styles.boxRow1, { backgroundColor: "#FF5959" }]}>
              <Text style={{ color: "#fff", margin: 15, fontSize: 18 }}>
                Deaths
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 25,
                  margin: 13,
                  fontWeight: "bold",
                }}
              >
                {!this.state.Deaths ? "Loading..." : this.state.Deaths}
              </Text>
            </View>
          </View>

          {/* 2nd row of boxes  */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
              width: "95%",
            }}
          >
            <View
              style={[
                styles.boxRow2,
                { backgroundColor: "#4CD97B", width: 130 },
              ]}
            >
              <Text style={{ color: "#fff", margin: 15, fontSize: 18 }}>
                Recovered
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 21,
                  margin: 13,
                  fontWeight: "bold",
                }}
              >
                {!this.state.Recovered ? "Loading..." : this.state.Recovered}
              </Text>
            </View>

            <View
              style={[
                styles.boxRow2,
                { backgroundColor: "#4DB5FF", width: 110 },
              ]}
            >
              <Text style={{ color: "#fff", margin: 15, fontSize: 18 }}>
                Active
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 21,
                  margin: 13,
                  fontWeight: "bold",
                }}
              >
                {!this.state.Active ? "Loading" : this.state.Active}
              </Text>
            </View>

            <View style={[styles.boxRow2, { backgroundColor: "#9059FF" }]}>
              <Text style={{ color: "#fff", margin: 15, fontSize: 18 }}>
                Serious
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 21,
                  margin: 13,
                  fontWeight: "bold",
                }}
              >
                {!this.state.Serious ? "Loading..." : this.state.Serious}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              marginLeft: 150,
              marginTop: 30,
              fontWeight: "bold",
            }}
          >
            last Updated 10 minutes ago
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({ ModalVisible: true });
          }}
        >
          <View style={styles.card}>
            <Image
              source={require("../../assets/globe.png")}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ width: "70%" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  margin: 10,
                  textAlign: "center",
                }}
              >
                Click Here To See Global Covid Stats
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    margin: 10,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Read More
                </Text>
                <ArrowIcon
                  name="arrow-circle-right"
                  color="#5c5c5c"
                  size={40}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainView: {
    width: "100%",
    height: "75%",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: "#473F97",
  },
  boxRow1: {
    width: 165,
    height: 115,
    borderRadius: 10,
  },

  boxRow2: {
    width: 120,
    height: 110,
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    marginTop: 25,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#a39ed3",
    height: "41.5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ModalCountriesRecoveredEtcTextStyle: {
    fontSize: 13.5,
    fontWeight: "bold",
  },
});
