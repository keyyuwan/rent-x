import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

const AnimatedRectButton = Animated.createAnimatedComponent(RectButton);

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { CarCard } from "../../components/CarCard";
import { Loading } from "../../components/Loading";

import Logo from "../../assets/logo.svg";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const { navigate } = useNavigation();
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const myCarsButtonPositionX = useSharedValue(0);
  const myCarsButtonPositionY = useSharedValue(0);

  const myCarsButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: myCarsButtonPositionX.value },
        { translateY: myCarsButtonPositionY.value },
      ],
    };
  });

  const onGestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = myCarsButtonPositionX.value;
      ctx.positionY = myCarsButtonPositionY.value;
    },
    onActive(event, ctx: any) {
      myCarsButtonPositionX.value = ctx.positionX + event.translationX;
      myCarsButtonPositionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      myCarsButtonPositionX.value = withSpring(0);
      myCarsButtonPositionY.value = withSpring(0);
    },
  });

  function handleCarDetails(car: CarDTO) {
    navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get("/cars");

        setCars(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {isFetching ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CarCard data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View
          style={[
            myCarsButtonAnimatedStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <AnimatedRectButton
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </AnimatedRectButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
