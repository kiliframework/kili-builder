import { defaultAttrBuilder } from '../../blocks/utils';

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
  textAlign: defaultAttrBuilder( 'text-align', 'center' ),
  color: defaultAttrBuilder( 'color', 'black' ),
  fontSize: defaultAttrBuilder( 'font-size', '32px' ),
  fontWeight: defaultAttrBuilder( 'font-weight', 700 ),
  lineHeight: defaultAttrBuilder( 'line-height', '34px' ),
  letterSpacing: defaultAttrBuilder( 'letter-spacing', '-0.53px' ),
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
