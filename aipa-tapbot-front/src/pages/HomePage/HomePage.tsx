import React from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
  return (
    <>
      <div className={cx('pageWrapper')}>Home page</div>
    </>
  );
};

export default HomePage;
