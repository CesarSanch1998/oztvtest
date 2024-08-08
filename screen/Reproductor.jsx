import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function ReproductorVideo() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    console.log(status)
    // console.log(video)
  },[status])

  return (
    <Video
      ref={video}
      style={{ width: 300, height: 300 }}
      source={{
        uri: 'http://localhost:8005/movies/1.mp4', // Reemplaza con la URL correcta
      }}
      shouldPlay
      resizeMode="contain"
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      onError={(error) => console.error('Error al reproducir el video:', error)}
    />
  );
}
// https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  landscape: {
    transform: [{ rotate: "90deg" }], // Rotar la pantalla a landscape
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
