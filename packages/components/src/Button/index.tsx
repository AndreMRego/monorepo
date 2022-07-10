import React from "react";

import * as S from "./styles"

export interface IButton  {
  children: React.ReactNode | string;
  color?: string;
  backgroundColor?: string;
}

const Button = ({ children, color, backgroundColor }: IButton) => {
  return <S.Button style={{color, backgroundColor }}>{children}</S.Button>
}

export { Button }