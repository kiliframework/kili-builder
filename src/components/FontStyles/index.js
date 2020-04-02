import range from 'lodash/range';
import AdvancedColorControl from '../AdvancedColorControl';
import { getDeviceValue } from '../../blocks/utils/getDeviceValue';
import { valueSetter } from '../../blocks/utils/valueSetter';

const { __ } = wp.i18n;
const { PanelBody, Toolbar, RangeControl } = wp.components;
const { AlignmentToolbar } = wp.blockEditor;

export default function FontStyles( props ) {
  const { attributes, setAttributes } = props;
  const { currentTab, level, textAlign, color, fontSize, lineHeight, letterSpacing } = attributes;

  const alignValue = getDeviceValue(textAlign, currentTab);
  const colorValue = getDeviceValue(color, currentTab);
  const fontSizeValue = getDeviceValue(fontSize, currentTab);
  const lineHeightValue = getDeviceValue(lineHeight, currentTab);
  const letterSpacingValue = getDeviceValue(letterSpacing, currentTab);

  const createLevelControl = ( targetLevel ) => {
    return [ {
      icon: 'heading',
      // translators: %s: heading level e.g: "1", "2", "3"
      title: sprintf( __( 'Heading %d' ), targetLevel ),
      isActive: targetLevel === level,
      onClick: () => setAttributes( { level: targetLevel } ),
      subscript: String( targetLevel ),
    } ];
  };

  return (
    <PanelBody title={ __( 'Heading Settings' ) }>
      <div className="kb-tag-level-control">
        <p>{ __( 'HTML Tag' ) }</p>
        <Toolbar controls={ range( 1, 7 ).map( createLevelControl ) } />
      </div>
      <p>{ __( 'Text Alignment' ) }</p>
      <AlignmentToolbar
        value={ alignValue }
        onChange={ ( value ) => {
          setAttributes( { textAlign: valueSetter( textAlign, currentTab, value ) } );
        } }
      />
      <AdvancedColorControl
        label={ __( 'Heading Color' ) }
        colorValue={ ( colorValue ? colorValue : '' ) }
        colorDefault={ colorValue }
        onColorChange={ ( value ) => setAttributes( { color: valueSetter( color, currentTab, value ) } ) }
      />
      <RangeControl
        label={ __( 'Font Size' ) }
        value={ ( fontSizeValue ? fontSizeValue : '' ) }
        onChange={ ( value ) => setAttributes( { fontSize: valueSetter(fontSize, currentTab, value) } ) }
        min={ 5 }
        max={ 200 }
        step={ 1 }
      />
      <RangeControl
        label={ __( 'Line Height' ) }
        value={ ( lineHeightValue ? lineHeightValue : '' ) }
        onChange={ ( value ) => setAttributes( { lineHeight: valueSetter(lineHeight, currentTab, value) } ) }
        min={ 5 }
        max={ 200 }
        step={ 1 }
      />
      <RangeControl
        label={ __( 'Letter Spacing' ) }
        value={ ( letterSpacingValue ? letterSpacingValue : '' ) }
        onChange={ ( value ) => setAttributes( { letterSpacing: valueSetter(letterSpacing, currentTab, value) } ) }
        min={ -50 }
        max={ 50 }
        step={ 0.1 }
      />
    </PanelBody>
  );
}
