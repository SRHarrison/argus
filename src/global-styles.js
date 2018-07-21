import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${styledNormalize};

  @import url('https://fonts.googleapis.com/css?family=Barlow:300,400,600,700');
  @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css');

  body {
    height: 100%;
    width: 100%;
    color: #202326;
  }
  #root {
    font-family: 'Barlow', sans-serif;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;
