import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { api } from "../../../services/api";

import { GoBackButton } from "../../../components/GoBackButton";
import { BulletPoint } from "../../../components/BulletPoint";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from "./styles";

interface Params {
  user: {
    email: string;
    name: string;
    driverLicense: string;
  };
}

export function SecondStep() {
  const theme = useTheme();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const { user } = route.params as Params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleGoBack() {
    goBack();
  }

  async function handleRegister() {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      Alert.alert("Informe a senha e confirme-a");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("As senhas devem ser iguais");
      return;
    }

    try {
      await api.post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      });

      navigate("Confirmation", {
        nextScreenRoute: "SignIn",
        title: "Conta criada!",
        message: `Agora é só fazer login\ne aproveitar`,
      });
    } catch (err) {
      Alert.alert("Opa!", "Não foi possível realizar seu cadastro :(");
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="none"
            translucent
          />

          <Header>
            <GoBackButton onPress={handleGoBack} />
            <Steps>
              <BulletPoint active />
              <BulletPoint />
            </Steps>
          </Header>

          <Title>Crie sua {"\n"}conta</Title>
          <Subtitle>Faça seu cadastro de {"\n"}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
