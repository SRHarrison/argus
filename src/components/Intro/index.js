import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from 'components/Label';

const Styled = styled.div`
  z-index: 1001;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform: translate(50%,0);  
`;

const IntroContent = styled.div`
  background-color: rgba(255,255,255,0.9);
  width: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 20px;
  transform: translate(-50%, 0);
`;

/* eslint-disable react/no-danger */
const Intro = ({ dismiss, html }) => (
  <Styled role="banner">
    <IntroContent>
      <span dangerouslySetInnerHTML={{ __html: html }} />
      <button onClick={dismiss}>
        <Label id="component.intro.explore" />
      </button>
    </IntroContent>
  </Styled>
);
/* eslint-enable react/no-danger */

Intro.propTypes = {
  dismiss: PropTypes.func.isRequired,
  html: PropTypes.string,
};

export default Intro;
