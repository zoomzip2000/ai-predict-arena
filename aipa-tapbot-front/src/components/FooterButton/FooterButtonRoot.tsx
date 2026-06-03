import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterButtonRoot.module.scss';
import classNames from 'classnames/bind';
import { Path } from '../../constants/types';

const cx = classNames.bind(styles);

interface FooterButtonRootProps extends React.ComponentProps<'button'> {
  path: Path;
}

const FooterButtonRoot = ({ path, children, ...props }: FooterButtonRootProps) => {
  return (
    <button className={cx('footerButton')} {...props}>
      <Link to={path}>{children}</Link>
    </button>
  );
};

export default FooterButtonRoot;
