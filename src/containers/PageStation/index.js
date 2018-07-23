import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';

import getLabel from 'utils/get-label';
import attributesEqual from 'utils/attributes-equal';

import { navigate } from 'containers/App/actions';
import {
  selectStationIdFromLocation,
  selectImageTypeFromLocation,
  selectCameraFromLocation,
  selectSites,
  selectStations,
} from 'containers/App/selectors';
import { IMAGE_TYPES } from 'containers/App/constants';
import Label from 'components/Label';

import Row from 'styles/Row';
import Column from 'styles/Column';

const key = 'station';

const Secondary = styled.div`
  color: grey;
`;

const SecondaryLabel = Secondary.withComponent('label');

const SingleStation = styled.div`
  font-weight: bold;
`;

const ImageButton = styled.button`
  ${(props) => props.active && css`
    color: ${props.theme.colors.white};
    background-color: ${props.theme.colors.black};
  `}
`;

class PageStation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  stationChange(e) {
    this.props.nav({ query: { id: e.target.value } });
  }
  imageTypeChange(output) {
    this.props.nav({ query: { output } });
  }
  cameraChange(e) {
    this.props.nav({ query: { view: e.target.value } });
  }
  render() {
    const { stations, sites, stationId, output, camera } = this.props;

    // the active station
    const stationSelected = stations && stationId && stations.find((item) => attributesEqual(item.get('id'), stationId));
    // site for active station
    const site = stationSelected && sites.find((item) => attributesEqual(item.get('id'), stationSelected.get('siteID')));
    // other stations at same site (if present)
    const stationsForSite = stations && site && stations.filter((item) => attributesEqual(item.get('siteID'), site.get('id')));

    // figure out camera options based on specified camera number
    const cameraOptions = ['rm'];
    if (stationSelected) {
      for (let i = 0; i < stationSelected.get('cameras'); i++) { // eslint-disable-line no-plusplus
        cameraOptions.push(`c${i + 1}`);
      }
    }

    return (
      <div>
        <Helmet>
          <title>{getLabel(`component.${key}.title`)}</title>
          <meta
            name="description"
            content={getLabel(`component.${key}.metaDescription`)}
          />
        </Helmet>
        <Row>
          <Column width={[1, 1, 2 / 3]} >
            <Row>
              <Column width={[1, 1, 2 / 3]} >
                <Secondary>
                  { site && `${getLabel('component.station.siteID')}: ${site.get('id')}` }
                </Secondary>
                <h2 id="pageTitle">
                  { site && site.get('name') }
                </h2>
              </Column>
              <Column width={[1, 1, 1 / 3]} >
                { stationsForSite && stationsForSite.size > 1 &&
                  <div>
                    <div>
                      <SecondaryLabel htmlFor="station-select">
                        <Label id="component.station.stationSelect" />
                      </SecondaryLabel>
                    </div>
                    <div>
                      <select id="station-select" value={stationId} onChange={(e) => this.stationChange(e)}>
                        { stationsForSite && stationsForSite.map((station) => (
                          <option key={station.get('id')} value={station.get('id')} >
                            { station.get('name') }
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                }
                { stationsForSite && stationsForSite.size === 1 &&
                  <div>
                    <Secondary>
                      <Label id="component.station.station" />
                    </Secondary>
                    <SingleStation>
                      { stationSelected.get('name') }
                    </SingleStation>
                  </div>
                }
              </Column>
            </Row>
            <Row>
              <Column width={[1, 1, 2 / 3]} >
                <Secondary>
                  <Label id="component.station.imageTypeSelect" />
                </Secondary>
                <div>
                  {
                    stationSelected && IMAGE_TYPES.map((image) => stationSelected.get(image) !== 'false'
                    ? (
                      <ImageButton
                        key={image}
                        active={output === image}
                        onClick={() => this.imageTypeChange(image)}
                      >
                        <Label id={`data.image-types.${image}`} />
                      </ImageButton>
                    )
                    : null
                  )}
                </div>
              </Column>
              <Column width={[1, 1, 1 / 3]} >
                <div>
                  <div>
                    <SecondaryLabel htmlFor="camera-select">
                      <Label id="component.station.cameraSelect" />
                    </SecondaryLabel>
                  </div>
                  <div>
                    <select id="camera-select" value={camera} onChange={(e) => this.cameraChange(e)}>
                      { cameraOptions.map((view) => (
                        <option key={view} value={view} >
                          <Label id={`data.cameras.${view}`} />
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Column>
            </Row>
          </Column>
          <Column width={[1, 1, 1 / 3]} >
            <h2>
              <Label id="component.station.asideTitle" />
            </h2>
          </Column>
        </Row>
      </div>
    );
  }
}

PageStation.propTypes = {
  nav: PropTypes.func.isRequired,
  sites: PropTypes.object,
  stations: PropTypes.object,
  stationId: PropTypes.string,
  output: PropTypes.string,
  camera: PropTypes.string,
};

PageStation.defaultProps = {
  output: IMAGE_TYPES[0],
  camera: 'rm',
};

const mapStateToProps = (state) => ({
  sites: selectSites(state),
  stations: selectStations(state),
  stationId: selectStationIdFromLocation(state),
  output: selectImageTypeFromLocation(state),
  camera: selectCameraFromLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  // navigate to location
  nav: (location) => {
    dispatch(navigate(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageStation);
