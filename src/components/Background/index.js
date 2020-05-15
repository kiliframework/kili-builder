import { SelectControl, PanelBody } from '@wordpress/components';
import { attrOptionsBuiler } from '../../blocks/utils';
import { MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { COLORS } from '../../constants';
import AdvancedRangeControl from '../AdvancedRangeControl';
import AdvancedColorPalette from '../AdvancedColorPalette';
import ImageControl from '../ImageControl';
import AdvancedSelectControl from '../AdvancedSelectControl';
import { useDeviceTab } from '../../hooks/useDeviceTab';
import { useClientID } from '../../hooks/useClientID';
import { useSelect } from '@wordpress/data';

const { useMemo } = wp.element;

const backgroundImageSizeOptions = attrOptionsBuiler( [
  [ 'cover', 'Cover', 'Cover' ],
  [ 'contain', 'Contain', 'Contain' ],
  [ 'auto', 'Auto', 'Auto' ],
] );
const backgroundPositionOptions = attrOptionsBuiler( [
  [ 'top', 'Top', 'Top' ],
  [ 'bottom', 'Bottom', 'Bottom' ],
  [ 'left', 'Left', 'Left' ],
  [ 'right', 'Right', 'Right' ],
  [ 'center', 'Center', 'Center' ],
  [ 'unset', 'Unset', 'Unset' ],
] );

export default function BackgroundControl() {
  const { name: tab } = useDeviceTab();
  const clientID = useClientID();
  const currentBlockAttributes = useSelect(
    ( select ) => select( 'core/block-editor' ).getBlockAttributes( clientID )
  );
  const backgroundImage = useMemo( () => currentBlockAttributes.backgroundImage[ tab ]?.value, [ currentBlockAttributes ] );

  return (
    <>
      <PanelBody title={ __( 'Background Settings', 'kili-builder' ) }>
        <AdvancedRangeControl
          label={ __( 'Opacity', 'kili-builder' ) }
          attributeName="opacity"
          min={ 0 }
          max={ 1 }
          step={ 0.01 }
        />
        <AdvancedColorPalette
          attributeName="backgroundColor"
          label="Color"
          colors={ COLORS }
        />
        <MediaUploadCheck>
          <ImageControl
            attributeName="backgroundImage"
            label={ __( 'Background Image', 'kili-builder' ) }
          />
        </MediaUploadCheck>

        { backgroundImage?.url && (
          <>
            <AdvancedSelectControl
              label="Background Image Size"
              attributeName="backgroundSize"
              options={ backgroundImageSizeOptions }
            />
            <AdvancedSelectControl
              label="Background Position"
              attributeName="backgroundPosition"
              options={ backgroundPositionOptions }
            />
          </>
        ) }

      </PanelBody>
    </>
  );
}
