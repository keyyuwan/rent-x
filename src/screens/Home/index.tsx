import React from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { CarCard } from "../../components/CarCard";

import Logo from "../../assets/logo.svg";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

export function Home() {
  const car = {
    brand: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail:
      "https://w7.pngwing.com/pngs/483/821/png-transparent-2018-audi-s5-3-0t-premium-plus-coupe-audi-rs5-2017-audi-s5-car-audi-compact-car-sedan-car.png",
  };

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

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <CarCard data={car} />}
      />
    </Container>
  );
}
