import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  isLoading = false,
  light = false,
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      color={color ?? theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: isLoading || !enabled ? 0.5 : 1 }}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
