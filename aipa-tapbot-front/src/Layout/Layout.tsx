// React & Styling
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

// Components
import { FooterButtonIcon, FooterButtonRoot } from '../components';

// Utils & libs & Constants
import Lottie from 'react-lottie';
import classNames from 'classnames/bind';
import animationData from '../assets/lotties/backgroundLottie.json';
import { Path, Icon } from '../constants/types';

const cx = classNames.bind(styles);

export interface FooterButtonAttributes {
  path: Path;
  icon: Icon;
}

const Layout: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const footerButtons: FooterButtonAttributes[] = [
    {
      path: '/',
      icon: 'home',
    },
    {
      path: '/referals',
      icon: 'referals',
    },
    {
      path: '/tasks',
      icon: 'tasks',
    },
  ];

  const renderFooterButtons = (): ReactNode => {
    return footerButtons.map(({ path, icon }) => {
      return (
        <FooterButtonRoot path={path}>
          <FooterButtonIcon icon={icon} />
        </FooterButtonRoot>
      );
    });
  };

  return (
    <div className={cx('layout')}>
      <main>
        <div>
          <Lottie
            options={defaultOptions}
            height="100%"
            width="100%"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
          />

          <div className={cx('contentWrapper')}>
            <Outlet />
          </div>
        </div>
      </main>

      <footer>{renderFooterButtons()}</footer>
    </div>
  );
};

export default Layout;
