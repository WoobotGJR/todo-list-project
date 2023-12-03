import React from 'react';
import style from '../styles/modules/todoItem.module.scss';
import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkVariants = {
  checked: {
    pathLength: 1,
    transition: { duration: 0.2 },
  },
  unchecked: {
    pathLength: 0,
  },
  initial: {
    color: '#fff',
  },
};

const boxVariants = {
  checked: {
    background: 'linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)',
    pathLength: 1,
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  unchecked: {
    background: 'linear-gradient(135deg, #F5F7FA 0%, #EBECF0 100%)',
    pathLength: 0,
    scale: 1,
    transition: { duration: 0.2 },
  },
  initial: {
    color: '#fff',
  },
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, setChecked }) => {
  return (
    <motion.div
      className={style.svgBox}
      onClick={() => setChecked(!checked)}
      animate={checked ? 'checked' : 'unchecked'}
      variants={boxVariants}
    >
      <motion.svg
        className={style.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'visible' : 'hidden'}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
};

export default Checkbox;
