import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Input } from "react-native-elements/dist/input/Input";
import { Audio } from "expo-av";

// const socket = io("http://192.168.1.6:5000");
const socket = io("https://chat-room-pk18.herokuapp.com/");

export default function ChatScreen({ user, setUser, setIsLoggedIn }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Water.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    socket.emit("new-user-connected", user);
  }, [user]);

  useEffect(() => {
    socket.on("user-added", (name) => {
      setMessages((pre) => [
        ...pre,
        { direction: "center", message: `${name} has joined!` },
      ]);
      playSound();
    });
  }, [socket]);

  useEffect(() => {
    socket.on("left", (name) => {
      setMessages((pre) => [
        ...pre,
        { direction: "center", message: `${name} has left!` },
      ]);
      playSound();
    });
  }, [socket]);

  useEffect(() => {
    socket.on("receive", (data) => {
      setMessages((pre) => [
        ...pre,
        { direction: "left", message: `${data.name}: \n${data.message}` },
      ]);
      playSound();
    });
  }, [socket]);

  const handleSend = () => {
    if (message !== "" && message !== null) {
      setMessages((pre) => [
        ...pre,
        { direction: "right", message: `me: \n${message}` },
      ]);
      socket.emit("send", message);
      setMessage("");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={{ fontSize: 20, textAlign: "center" }}>Room</Text>
      </View>
      <ScrollView style={styles.divWrapper}>
        {messages.map((one, index) => {
          if (one.direction === "left") {
            return (
              <View key={index} style={styles.otherMessage}>
                <Text>{one.message}</Text>
              </View>
            );
          } else if (one.direction === "right") {
            return (
              <View key={index} style={styles.myMessage}>
                <Text>{one.message}</Text>
              </View>
            );
          } else {
            return (
              <Text style={{ textAlign: "center" }} key={index}>
                {one.message}
              </Text>
            );
          }
        })}
      </ScrollView>
      <View style={styles.buttonView}>
        <Input
          value={message}
          onChangeText={(text) => setMessage(text)}
          containerStyle={{ width: "80%" }}
          placeholder="Message:"
        />
        <Button
          style={{ backgroundColor: "skyblue" }}
          onPress={handleSend}
          title="Send"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#def3fa",
    alignItems: "center",
  },
  divWrapper: {
    width: "80%",
  },
  buttonView: {
    marginBottom: 20,
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
  },
  myMessage: {
    maxWidth: "60%",
    marginLeft: "auto",
    padding: 5,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "#b2f7cd",
    marginTop: 10,
  },
  otherMessage: {
    maxWidth: "60%",
    marginRight: "auto",
    padding: 5,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "#bcecf5",
    marginTop: 10,
  },
});
