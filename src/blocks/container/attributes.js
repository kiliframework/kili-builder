const getUUID = function() {
  const cryptoObj = window.crypto || window.msCrypto;
  return ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace( /[018]/g, ( c ) =>
    ( c ^ cryptoObj.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & 15 >> c / 4 ).toString( 16 )
  );
};

export default {
  content: {
    type: 'array',
    source: 'children',
    selector: 'p',
  },
  tagName: {
    type: 'string',
    default: 'grid',
  },
  backgroundColor: {
    type: 'string',
    default: '#FFFFFF',
  },
  backgroundImage: {
    type: 'string',
    default: '',
  },
  mobileBackgroundImage: {
    type: 'string',
    default: '',
  },
  backgroundImageId: {
    type: 'integer',
    default: 0,
  },
  mobileBackgroundImageId: {
    type: 'integer',
    default: 0,
  },
  useContainer: {
    type: 'boolean',
    default: true,
  },
  UUID: {
    type: 'string',
    default: getUUID(),
  },
  marginBottomMobile: {
    type: 'integer',
    default: 0,
  },
  marginTopMobile: {
    type: 'integer',
    default: 0,
  },
  marginBottomDesktop: {
    type: 'integer',
    default: 0,
  },
  marginTopDesktop: {
    type: 'integer',
    default: 0,
  },
  paddingBottomMobile: {
    type: 'integer',
    default: 0,
  },
  paddingTopMobile: {
    type: 'integer',
    default: 0,
  },
  paddingBottomDesktop: {
    type: 'integer',
    default: 0,
  },
  paddingTopDesktop: {
    type: 'integer',
    default: 0,
  },
};
