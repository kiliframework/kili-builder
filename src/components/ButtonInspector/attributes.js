import { defaultAttrBuilder, pseudoClassAttrBuilder } from '../../blocks/utils';

export default {
  buttonText: {
    type: 'string',
    default: '',
  },
  buttonPlaceholder: {
    type: 'string',
    default: '',
  },
  buttonBackgroundColor: defaultAttrBuilder( 'background-color', pseudoClassAttrBuilder() ),
  buttonTextColor: defaultAttrBuilder( 'color', pseudoClassAttrBuilder() ),
  buttonBorderRadius: {
    type: 'number',
    default: 0,
  },
  buttonRel: {
    type: 'string',
    default: '',
  },
};
