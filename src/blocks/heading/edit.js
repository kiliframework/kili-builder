import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import Inspector from './inspector';
import { getDeviceValue } from '../utils';
import withStyles from '../../hoc/withStyles';
import withUniqueClassName from '../../hoc/withUniqueClassName';
import withClientID from '../../hoc/withClientID';
import { compose } from '@wordpress/compose';
import headingStyles from './style';
import AdvancedRichText from '../../components/AdvancedRichText';

const HeadingEdit = ( props ) => {
  const { attributes, setAttributes } = props;
  const {
    uniqueClassName,
    currentTab,
    color,
    level,
    fontSize,
    textAlign,
    lineHeight,
    letterSpacing,
    includeLines,
    linesColor,
    linesSize,
    fontWeight,
  } = attributes;

  const onTextChange = ( text ) => setAttributes( { text } );
  const tagName = 'h' + level;
  const fontSizeValue = getDeviceValue( fontSize, currentTab );
  const fontWeightValue = getDeviceValue( fontWeight, currentTab );
  const colorValue = getDeviceValue( color, currentTab );
  const linesColorValue = getDeviceValue( linesColor, currentTab );
  const linesSizeValue = getDeviceValue( linesSize, currentTab );
  const textAlignValue = getDeviceValue( textAlign, currentTab );
  const lineHeightValue = getDeviceValue( lineHeight, currentTab );
  const letterSpacingValue = getDeviceValue( letterSpacing, currentTab );

  const getLineStyles = () => {
    const styles = `
    .kili-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .kili-heading::before {
      margin-right: 36px;
    }
    .kili-heading::after {
      margin-left: 36px;
    }
  
    .kili-heading::before,
    .kili-heading::after {
      content: "";
      display: block;
      height: ${ linesSizeValue }px;
      width: 50%;
      background-color: ${ linesColorValue };
    }
    `;
    return styles;
  };

  return (
    <>
      <Inspector { ...props } />
      <AdvancedRichText
        className={ uniqueClassName }
        tagName={ level && tagName }
        attributeName="text"
      />
      { includeLines && <style>
        { getLineStyles() }
      </style> }
    </>
  );
};

export default compose( [
  withClientID,
  withUniqueClassName,
  withStyles( headingStyles ),
] )( HeadingEdit );
