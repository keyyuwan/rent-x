import React from "react";
import { Container } from "./styles";

interface BulletPointProps {
  active?: boolean;
}

export function BulletPoint({ active = false }: BulletPointProps) {
  return <Container active={active} />;
}
