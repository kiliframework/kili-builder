import { defaultAttrBuiler, pseudoClassAttrBuilder } from '../../blocks/utils';

export default {
  buttonText: {
    type: 'string',
    default: '',
  },
  buttonPlaceholder: {
    type: 'string',
    default: '',
  },
  buttonBackgroundColor: defaultAttrBuiler( 'background-color', pseudoClassAttrBuilder() ),
  buttonTextColor: defaultAttrBuiler( 'color', pseudoClassAttrBuilder() ),
  buttonBorderRadius: {
    type: 'number',
    default: 0,
  },
  buttonRel: {
    type: 'string',
    default: '',
  },
};
