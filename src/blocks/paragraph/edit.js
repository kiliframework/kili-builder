import { compose } from '@wordpress/compose';

import Inspector from './inspector';
import AdvancedRichText from '../../components/AdvancedRichText';
import withClientID from '../../hoc/withClientID';
import withUniqueClassName from '../../hoc/withUniqueClassName';
import withStyles from '../../hoc/withStyles';

import paragraphStyles from './style';

const ParagraphEdit = ( props ) => {
  const { attributes } = props;
  const { uniqueClassName } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <AdvancedRichText
        className={ uniqueClassName }
        tagName="p"
      />
    </>
  );
};

export default compose( [
  withClientID,
  withUniqueClassName,
  withStyles( paragraphStyles ),
] )( ParagraphEdit );
