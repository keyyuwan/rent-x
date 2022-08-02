import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonCompleteProps extends RectButtonProps {
  title: string;
}

export function ButtonComplete({ title, ...rest }: ButtonCompleteProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
