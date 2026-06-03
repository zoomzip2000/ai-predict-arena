import React from 'react';
import homeIcon from '../../assets/icons/home.png';
import referalsIcon from '../../assets/icons/referals.png';
import rocketIcon from '../../assets/icons/rocket.png';
import { Icon } from '../../constants/types';

interface FooterButtonIconProps extends React.ComponentProps<'button'> {
  icon: Icon;
}

const FooterButtonIcon = ({ icon }: FooterButtonIconProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'referals':
        return referalsIcon;

      case 'tasks':
        return rocketIcon;

      default:
        return homeIcon;
    }
  };

  return (
    <>
      <div>
        <img src={renderIcon()} alt={icon} />
      </div>
    </>
  );
};

export default FooterButtonIcon;
