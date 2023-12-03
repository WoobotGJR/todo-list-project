import React from 'react';
import style from '../styles/modules/button.module.scss';

interface DropDownProps {
  children: React.ReactNode;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  children,
  name,
  onChange,
  value,
}) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className={style['dropdown__select']}
      name={name}
      id=""
    >
      {children}
    </select>
  );
};

export default DropDown;
