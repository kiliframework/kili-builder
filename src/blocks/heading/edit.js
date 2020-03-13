import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import Inspector from './inspector';
import { getDeviceValue } from '../utils';

const MaComp = ( props ) => {
  const { attributes, setAttributes } = props;
  const { currentTab, color, level, fontSize, textAlign } = attributes;

  const onTextChange = ( text ) => setAttributes( { text } );
  const tagName = 'h' + level;
  const fontSizeValue = getDeviceValue(fontSize, currentTab);
  const colorValue = getDeviceValue(color, currentTab);
  const textAlignValue = getDeviceValue(textAlign, currentTab);
  
  return (
    <>
      <Inspector { ...props } />
      <RichText
        style={ {
          fontSize: `${fontSizeValue}px`,
          fontFamily: 'Gt Walsheim',
          color: colorValue,
          letterSpacing: '-0.8px',
          lineHeight: '50px',
          textAlign: textAlignValue,
          opacity: .8,
        } }
        className="kili-heading"
        tagName={ tagName }
        onChange={ onTextChange }
        value={ attributes.text }
      />
    </>
  );
};

export default MaComp;
