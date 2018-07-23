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
`;

const Dismiss = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3);
`;

const IntroContent = styled.div`
  background-color: rgba(255,255,255,0.9);
  width: 400px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
`;

/* eslint-disable react/no-danger */
const Intro = ({ onDismiss, html }) => (
  <Styled>
    <Dismiss onClick={onDismiss} />
    <IntroContent>
      <span dangerouslySetInnerHTML={{ __html: html }} />
      <button onClick={onDismiss}>
        <Label id="component.intro.explore" />
      </button>
    </IntroContent>
  </Styled>
);
/* eslint-enable react/no-danger */

Intro.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  html: PropTypes.string,
};

export default Intro;
