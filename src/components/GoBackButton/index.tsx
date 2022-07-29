import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { BorderlessButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container } from "./styles";

interface GoBackButtonProps extends BorderlessButtonProps {
  color?: string;
}

export function GoBackButton({ color, ...rest }: GoBackButtonProps) {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ?? theme.colors.text}
      />
    </Container>
  );
}
