// update location in store
export const LOCATION_UPDATE = 'action.LOCATION_UPDATE';
// update location in URL
export const NAVIGATE = 'action.NAVIGATE';
export const LOAD_DATA = 'action.LOAD_DATA';
export const DATA_REQUESTED = 'action.DATA_REQUESTED';
export const DATA_LOADED = 'action.DATA_LOADED';
export const LOAD_ERROR = 'action.LOAD_ERROR';

export const S3_URL = 'https://{bucket}.s3.amazonaws.com/';

export const MAPBOX_TOKEN = 'pk.eyJ1IjoidG1mcm56IiwiYSI6ImNqanVycDc1dzlpYWYza3AxZnV1emt6aWIifQ.CZEH84wTME9YJ7NF7fKycw';

export const DATA = {
  sites: {
    data: [],
    requested: null,
    source: 's3',
    bucket: 'argusdata',
    path: '',
    type: 'csv',
    filename: 'sites.csv',
  },
  stations: {
    data: [],
    requested: null,
    source: 's3',
    bucket: 'argusdata',
    path: '',
    type: 'csv',
    filename: 'stations.csv',
  },
};

export const NAVITEMS = [
  {
    path: '',
    label: 'component.map.nav',
    group: 'primary',
  },
  {
    path: 'glossary',
    label: 'component.glossary.nav',
    group: 'primary',
  },
  {
    path: 'about',
    label: 'component.about.nav',
    group: 'secondary',
  },
  {
    path: 'credits',
    label: 'component.credits.nav',
    group: 'secondary',
  },
];

export const BREAKPOINTS = {
  SMALL: 0,
  MEDIUM: 1,
};

const constants = {
  BREAKPOINTS,
  NAVITEMS,
};
export default constants;
