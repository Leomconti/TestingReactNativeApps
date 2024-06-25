import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
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

  const addGasPayment = () => {
    const newPayment = 50; // Example value
    setGasPayment(gasPayment + newPayment);
  };

  const trackMileage = () => {
    const newMileage = 300; // Example value
    setMileage(newMileage);
  };

  const addTrip = () => {
    const newTrip: Trip = {
      id: trips.length + 1,
      time: new Date().toLocaleTimeString(),
      earnings: Math.floor(Math.random() * 50) + 10,
      timeOfDay: getTimeOfDay(),
    };
    setTrips([...trips, newTrip]);
  };

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 6) return "Dawn";
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Night";
  };

  const getTotalEarnings = (): number => trips.reduce((sum, trip) => sum + trip.earnings, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Uber Driver Finance Tracker</Text>

      <View style={styles.grid}>
        <Card>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>
              <Icon name="dollar-sign" size={20} style={styles.icon} /> Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Total Earnings: ${getTotalEarnings()}</Text>
            <Text>Gas Expenses: ${gasPayment}</Text>
            <Text>Last Mileage: {mileage} miles</Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={styles.cardTitle}>
              <Icon name="trending-up" size={20} style={styles.icon} /> Goals
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
      </View>

      <View style={styles.buttons}>
        <Button title="Add Gas Payment" onPress={addGasPayment} />
        <Button title="Track Mileage" onPress={trackMileage} />
        <Button title="Add Trip" onPress={addTrip} />
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007bff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  goal: {
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  trips: {
    marginTop: 16,
  },
  trip: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 8,
  },
});

export default FinanceTracker;
