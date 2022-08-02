import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ButtonComplete } from "../../components/ButtonComplete";

import BrandSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  function handleConfirm() {
    navigate("Home");
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <BrandSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ButtonComplete title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
