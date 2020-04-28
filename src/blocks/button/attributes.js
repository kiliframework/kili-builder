import { defaultAttrBuiler, pseudoClassAttrBuilder } from '../../blocks/utils';

export default {
  text: {
    type: 'string',
  },
  placeholder: {
    type: 'string',
  },
  backgroundColor: defaultAttrBuiler( 'background-color', pseudoClassAttrBuilder() ),
  textColor: defaultAttrBuiler( 'color', pseudoClassAttrBuilder() ),
  borderRadius: {
    type: 'number',
    default: 0,
  },
  rel: {
    type: 'string',
  },
};
