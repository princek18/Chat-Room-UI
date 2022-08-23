import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { Input } from "react-native-elements/dist/input/Input";
// import { Button } from "react-native-elements/dist/buttons/Button";

export default function HomeScreen({ setIsLoggedIn, user, setUser }) {
  const handleSubmit = () => {
    if (user !== "") setIsLoggedIn(true);
  };
  return (
    <View style={styles.wrapper}>
      <Input
        value={user}
        placeholder="Enter name:"
        onChangeText={(text) => setUser(text)}
        errorMessage={user.length === 0 ? "Name:" : null}
        errorStyle={{ color: "red" }}
        containerStyle={{ width: "60%" }}
      />
      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
