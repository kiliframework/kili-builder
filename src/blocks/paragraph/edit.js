import { RichText } from '@wordpress/block-editor';
import Inspector from './inspector';
import { getDeviceValue } from '../utils';

const MaComp = ( props ) => {
  const { attributes, setAttributes } = props;
  const { currentTab, color, fontSize, textAlign, lineHeight, letterSpacing } = attributes;

  const onTextChange = ( text ) => setAttributes( { text } );
  const fontSizeValue = getDeviceValue( fontSize, currentTab );
  const colorValue = getDeviceValue( color, currentTab );
  const textAlignValue = getDeviceValue( textAlign, currentTab );
  const lineHeightValue = getDeviceValue( lineHeight, currentTab );
  const letterSpacingValue = getDeviceValue( letterSpacing, currentTab );

  return (
    <>
      <Inspector { ...props } />
      <RichText
        style={ {
          fontSize: `${ fontSizeValue }px`,
          fontFamily: 'Gt Walsheim',
          color: colorValue,
          letterSpacing: `${ letterSpacingValue }px`,
          lineHeight: `${ lineHeightValue }px`,
          textAlign: textAlignValue,
          opacity: .8,
        } }
        tagName={ 'p' }
        onChange={ onTextChange }
        value={ attributes.text }
      />
    </>
  );
};

export default MaComp;
