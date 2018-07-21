import { createSelector } from 'reselect';
import attributesEqual from 'utils/attributes-equal';

// const getState = (state) => state;

export const selectLocation = (state) => state.get('location');
export const selectAnnouncement = (state) => state.get('announcement');
const selectDataState = (state) => state.get('data');

export const selectRequestedAt = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'requested'])
);

export const selectData = createSelector(
  selectDataState,
  (state, key) => key,
  (data, key) => data.get(key) && data.getIn([key, 'data'])
);

// sites
export const selectSites = createSelector(
  (state) => selectData(state, 'sites'),
  (data) => data
);

// stations
export const selectStations = createSelector(
  (state) => selectData(state, 'stations'),
  (data) => data
);

export const selectStationsBySiteID = createSelector(
  selectStations,
  (state, id) => id, // { key, value }
  (data, id) => data && data.filter((item) => attributesEqual(item.get('siteID'), id))
);
