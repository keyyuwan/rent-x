import React from "react";
import { Button, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { Container } from "./styles";

const DEVICE_WIDTH = Dimensions.get("window").width;

export function Splash() {
  const animated = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animated.value, {
            duration: 500,
            easing: Easing.bezier(0.05, 0.44, 0.91, 0.68),
          }),
        },
      ],
    };
  });

  function handleMove() {
    animated.value = Math.random() * (DEVICE_WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handleMove} />
    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "purple",
  },
});
