import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import CardHeader from "@/components/CardHeader";
import CardTitle from "@/components/CardTitle";
import Progress from "@/components/Progress";

interface Trip {
  id: number;
  time: string;
  earnings: number;
  timeOfDay: string;
}

const FinanceTracker = () => {
  const [gasPayment, setGasPayment] = useState<number>(0);
  const [mileage, setMileage] = useState<number>(0);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(200);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1000);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(4000);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleButtonPress = (type: string) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    const value = parseFloat(inputValue);
    if (modalType === "gas") {
      setGasPayment(gasPayment + value);
    } else if (modalType === "mileage") {
      setMileage(value);
    } else if (modalType === "trip") {
      const newTrip: Trip = {
        id: trips.length + 1,
        time: new Date().toLocaleTimeString(),
        earnings: value,
        timeOfDay: getTimeOfDay(),
      };
      setTrips([...trips, newTrip]);
    }
    setModalVisible(false);
    setInputValue("");
  };

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 6) return "Dawn";
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Night";
  };

  const getTotalEarnings = (): number => trips.reduce((sum, trip) => sum + trip.earnings, 0);

  const buttons = [
    { title: "Add Gas Payment", type: "gas" },
    { title: "Track Mileage", type: "mileage" },
    { title: "Add Trip", type: "trip" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Uber Driver Finance Tracker</Text>

      <Card style={styles.largeCard}>
        <CardHeader>
          <CardTitle style={styles.cardTitle}>
            <Icon name="dollar-sign" size={24} style={styles.icon} /> Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text>Total Earnings: ${getTotalEarnings()}</Text>
          <Text>Gas Expenses: ${gasPayment}</Text>
          <Text>Last Mileage: {mileage} miles</Text>
        </CardContent>
      </Card>

      <Card style={styles.largeCard}>
        <CardHeader>
          <CardTitle style={styles.cardTitle}>
            <Icon name="trending-up" size={24} style={styles.icon} /> Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.goal}>
            <Text>Daily Goal: ${dailyGoal}</Text>
            <Progress value={(getTotalEarnings() / dailyGoal) * 100} />
          </View>
          <View style={styles.goal}>
            <Text>Weekly Goal: ${weeklyGoal}</Text>
            <Progress value={(getTotalEarnings() / weeklyGoal) * 100} />
          </View>
          <View style={styles.goal}>
            <Text>Monthly Goal: ${monthlyGoal}</Text>
            <Progress value={(getTotalEarnings() / monthlyGoal) * 100} />
          </View>
        </CardContent>
      </Card>

      <ScrollView horizontal style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.actionButton} onPress={() => handleButtonPress(button.type)}>
            <Text style={styles.actionButtonText}>{button.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.trips}>
            {trips
              .slice(-5)
              .reverse()
              .map((trip) => (
                <View key={trip.id} style={styles.trip}>
                  <Text>Trip {trip.id}</Text>
                  <Text>{trip.time}</Text>
                  <Text>${trip.earnings}</Text>
                  <Text>{trip.timeOfDay}</Text>
                </View>
              ))}
          </View>
        </CardContent>
      </Card>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Enter {modalType === "gas" ? "Gas Payment" : modalType === "mileage" ? "Mileage" : "Trip Earnings"}
          </Text>
          <TextInput style={styles.input} onChangeText={setInputValue} value={inputValue} keyboardType="numeric" />
          <Button title="Submit" onPress={handleModalSubmit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007bff",
    textAlign: "center",
  },
  largeCard: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  goal: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trips: {
    marginTop: 16,
  },
  trip: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default FinanceTracker;
