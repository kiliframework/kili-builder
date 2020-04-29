import { defaultAttrBuiler } from '../../blocks/utils';

const FontStylesAttributes = {
  content: {
    type: 'string',
    source: 'html',
    selector: 'h1,h2,h3,h4,h5,h6',
  },
  level: {
    type: 'number',
    default: 2,
  },
  textAlign: defaultAttrBuiler( 'text-align', 'center' ),
  color: defaultAttrBuiler( 'color', 'black' ),
  fontSize: defaultAttrBuiler( 'font-size', '32px' ),
  fontWeight: defaultAttrBuiler( 'font-weight', 700 ),
  lineHeight: defaultAttrBuiler( 'line-height', '34px' ),
  letterSpacing: defaultAttrBuiler( 'letter-spacing', '-0.53px' ),
  sizeType: {
    type: 'string',
    default: 'px',
  },
  lineType: {
    type: 'string',
    default: 'px',
  },
};

export default FontStylesAttributes;
