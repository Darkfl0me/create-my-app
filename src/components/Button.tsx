import React, { ReactNode } from 'react';

type Props = {
  /** Buttons children */
  children: ReactNode;
}

export const Button = (props: Props) => {
  return <button>{props.children}</button>
}

export default Button;