import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { RangeControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BackgroundControl from '../../components/Background';
import DimensionsControl from '../../components/DimensionsControl';

const { useCallback } = wp.element;

export default function Inspector( props ) {
  const { attributes, setAttributes } = props;
  const { maxWidth, minHeight } = attributes;

  const handleWidthChange = useCallback(
    ( newWidth, type, tab ) => {
      setAttributes( { [ type ]: {
        ...attributes[ type ],
        [ tab ]: {
          ...attributes[ type ][ tab ],
          value: newWidth,
        },
      } } );
    },
    [],
  );

  return (
    <InspectorControls>
      <DevicesTabs
      >
        { ( { name: tab } ) => (
          <>
            <PanelBody initialOpen title="Dimensions Settings">
              <RangeControl
                label={ __( 'Max Width (pixels)', 'kili-builder' ) }
                value={ parseFloat( maxWidth[ tab ].value ) || '' }
                onChange={ ( newMaxWidth ) => handleWidthChange( Number( newMaxWidth ), 'maxWidth', tab ) }
                min={ 1 }
                max={ 2000 }
                step={ 1 }
              />
              <RangeControl
                label={ __( 'Minimum Height (pixels)', 'kili-builder' ) }
                value={ parseFloat( minHeight[ tab ].value ) || '' }
                onChange={ ( newMinHeight ) => handleWidthChange( Number( newMinHeight ), 'minHeight', tab ) }
                min={ 1 }
                max={ 2000 }
                step={ 1 }
              />
            </PanelBody>
            <PanelBody initialOpen title="Spacing Settings">
              <DimensionsControl
                { ...props }
                device={ tab }
                type={ 'padding' }
                label={ __( 'Padding', 'kili-builder' ) }
                help={ __( 'Space inside of the container.', 'kili-builder' ) }
              />
              <DimensionsControl
                { ...props }
                device={ tab }
                type={ 'margin' }
                label={ __( 'Margin', 'kili-builder' ) }
                help={ __( 'Space around the container.', 'kili-builder' ) }
              />
            </PanelBody>
            <BackgroundControl { ...props } device={ tab } />
          </>
        ) }
      </DevicesTabs>
    </InspectorControls>
  );
}
