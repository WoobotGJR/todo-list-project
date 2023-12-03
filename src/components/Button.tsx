import React from 'react';
import style from '../styles/modules/button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  type: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  type,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={(style.button, style[`button--${variant}`])}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
