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