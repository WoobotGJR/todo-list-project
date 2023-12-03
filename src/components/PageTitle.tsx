import React from 'react';
import style from '../styles/modules/title.module.scss';
import { FunctionComponent, ReactElement } from 'react';

interface PageTitleProps extends React.PropsWithChildren {
  props?: ReactElement;
  children: string;
}

const PageTitle: FunctionComponent<PageTitleProps> = ({
  children,
  ...props
}) => {
  return <p className={style.title}>{children}</p>;
};

export default PageTitle;
