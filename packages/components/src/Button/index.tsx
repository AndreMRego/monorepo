import React from "react";

import * as S from "./styles"

export interface IButton  {
  children: React.ReactNode | string;
  color?: string;
}

const Button = ({ children, color }: IButton) => {
  return <S.Button style={{color}}>{children}</S.Button>
}

export { Button }