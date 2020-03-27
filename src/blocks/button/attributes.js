import { defaultAttrBuiler, pseudoClassAttrBuilder } from "../../blocks/utils";

export default {
  text: {
    type: 'string',
  },
  placeholder: {
    type: 'string',
  },
  backgroundColor: pseudoClassAttrBuilder('background-color'),
  textColor: pseudoClassAttrBuilder('color'),
  borderRadius: {
    type: 'number',
    default: 0,
  },
  rel: {
    type: 'string',
  },
};
