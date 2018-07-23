import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import 'leaflet';
import 'leaflet.markercluster';

import attributesEqual from 'utils/attributes-equal';

import { selectSites, selectStations } from 'containers/App/selectors';
import { MAPBOX_TOKEN } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

const L = window.L;

const FITBOUNDS_OPTIONS = {
  padding: [120, 120],
  animate: false,
  duration: 0,
};

const Styled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

class Map extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.map = L.map(
      'll-map',
      {
        center: [0, 0],
        zoom: 2,
        layers: [
          L.tileLayer(
            'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png64?access_token={accessToken}',
            {
              id: 'mapbox.satellite',
              accessToken: MAPBOX_TOKEN,
            },
          ),
        ],
      },
    );
    // init marker layer
    this.markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
      animate: false,
    })
    .on('clusterclick', (cluster) => {
      cluster.layer.zoomToBounds(FITBOUNDS_OPTIONS);
    });
  }

  componentDidUpdate(nextProps) {
    // add markers
    const { sites } = this.props;
    if (sites && sites.size && sites !== nextProps.sites) this.addSites(this.props.sites);
  }

  onMarkerClick(e, site) {
    const station = this.props.stations.find((item) => attributesEqual(item.get('siteID'), site.get('id')));
    this.props.nav({
      path: 'station',
      query: {
        id: station.get('id'),
      },
    });
  }

  addSites(sites) {
    let bounds = L.latLngBounds();
    // add sites to map and remember bounds
    sites.forEach((site) => {
      const coordinates = [parseFloat(site.get('lat')), parseFloat(site.get('lon'))];
      bounds = bounds.extend(coordinates);
      L.marker(
        coordinates,
        {
          title: site.get('name'),
        }
      )
      .on('click', (e) => this.onMarkerClick(e, site))
      .addTo(this.markers);
    });
    // pan/zoom map to sites
    this.map.fitBounds(bounds, FITBOUNDS_OPTIONS);
    this.markers.addTo(this.map);
  }

  render() {
    return (
      <Styled id="ll-map" />
    );
  }
}

Map.propTypes = {
  nav: PropTypes.func.isRequired,
  sites: PropTypes.object,
  stations: PropTypes.object,
};

const mapStateToProps = (state) => ({
  sites: selectSites(state),
  stations: selectStations(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location, args) => {
    dispatch(navigate(location, args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
