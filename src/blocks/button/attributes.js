import { defaultAttrBuilder, pseudoClassAttrBuilder } from '../../blocks/utils';

export default {
  text: {
    type: 'string',
  },
  placeholder: {
    type: 'string',
  },
  backgroundColor: defaultAttrBuilder( 'background-color', pseudoClassAttrBuilder() ),
  textColor: defaultAttrBuilder( 'color', pseudoClassAttrBuilder() ),
  borderRadius: defaultAttrBuilder( 'border-radius' ),
  rel: {
    type: 'string',
  },
};
