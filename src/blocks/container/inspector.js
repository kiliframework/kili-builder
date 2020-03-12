import { InspectorControls } from '@wordpress/block-editor';
import DevicesTabs from '../../components/DevicesTabs';
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { useCallback } = wp.element;

export default function Inspector( { attributes, setAttributes } ) {
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
            <RangeControl
              label={ __( 'Max Width (pixels)', 'kili-builder' ) }
              value={ maxWidth[ tab ].value }
              onChange={ ( newMaxWidth ) => handleWidthChange( Number( newMaxWidth ), 'maxWidth', tab ) }
              min={ 1 }
              max={ 2000 }
              step={ 1 }
            />
            <RangeControl
              label={ __( 'Minimum Height (pixels)', 'kili-builder' ) }
              value={ minHeight[ tab ].value }
              onChange={ ( newMinHeight ) => handleWidthChange( Number( newMinHeight ), 'minHeight', tab ) }
              min={ 1 }
              max={ 2000 }
              step={ 1 }
            />
          </>
        ) }
      </DevicesTabs>
    </InspectorControls>
  );
}
