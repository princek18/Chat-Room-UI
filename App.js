import { useState } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import ChatScreen from "./Screens/ChatScreen";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar />
      {isLoggedIn ? (
        <ChatScreen
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <HomeScreen
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
