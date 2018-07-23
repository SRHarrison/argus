import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  ${styledNormalize};

  @import url('https://fonts.googleapis.com/css?family=Barlow:300,400,600,700');
  @import url('https://unpkg.com/leaflet@1.3.3/dist/leaflet.css');
  @import url('https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.css');
  @import url('https://unpkg.com/leaflet.markercluster@1.0.3/dist/MarkerCluster.Default.css');

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
