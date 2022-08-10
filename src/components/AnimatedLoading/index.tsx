import LottieView from "lottie-react-native";

import loadingAnimation from "../../assets/loading_animation.json";

import { Container } from "./styles";

export function AnimatedLoading() {
  return (
    <Container>
      <LottieView
        source={loadingAnimation}
        autoPlay
        resizeMode="contain"
        loop
        style={{ height: 200 }}
      />
    </Container>
  );
}
