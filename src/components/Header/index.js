import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Label from 'components/Label';

import Menu from 'containers/Menu';

import getLabel from 'utils/get-label';

import reactLogo from 'assets/React-icon.png';

const Styled = styled.header`
  width: 80px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
`;

const Brand = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  display: block;
  width: 80px;
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  vertical-align: middle;
  font-size: 0.8em;
`;


const Header = ({ navItems }) => (
  <Styled role="banner">
    <Brand>
      <Logo alt={getLabel('app.title')} src={reactLogo} role="presentation" />
      <Title>
        <Label id="app.title" />
      </Title>
    </Brand>
    <Menu navItems={navItems} />
  </Styled>
);

Header.propTypes = {
  navItems: PropTypes.array,
};


export default Header;
