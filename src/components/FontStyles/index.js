import { sprintf } from '@wordpress/i18n';
import range from 'lodash/range';

import HeadingLevelIcon from './heading-level-icon';
import headingDefaultValues from './heading-default-values';
import AdvancedColorPalette from '../AdvancedColorPalette';
import { COLORS } from '../../constants';
import AdvancedRangeControl from '../AdvancedRangeControl';
import AdvancedAlignmentToolbar from '../AdvancedAlignmentToolbar';

const { __ } = wp.i18n;
const { PanelBody, ToolbarGroup } = wp.components;

export default function FontStyles( props ) {
  const { attributes, setAttributes, isHeading } = props;
  const { level } = attributes;

  const getHeadingDefaultValuesFor = ( targetLevel, key, ) => ( {
    ...headingDefaultValues[ targetLevel ][ key ].default,
  } );

  const createLevelControl = ( targetLevel, selectedLevel ) => {
    const isActive = targetLevel === selectedLevel;

    return {
      icon: (
        <HeadingLevelIcon
          level={ targetLevel }
          isPressed={ isActive }
        />
      ),
      // translators: %s: heading level e.g: "1", "2", "3"
      title: sprintf( __( 'Heading %d' ), targetLevel ),
      isActive,
      onClick: () => setAttributes( {
        level: targetLevel,
        fontSize: getHeadingDefaultValuesFor( targetLevel, 'fontSize' ),
        lineHeight: getHeadingDefaultValuesFor( targetLevel, 'lineHeight' ),
        letterSpacing: getHeadingDefaultValuesFor( targetLevel, 'letterSpacing' ),
      } ),
    };
  };

  return (
    <PanelBody title={ __( 'Font Settings', 'kili-builder' ) }>
      { isHeading && (
        <div className="kb-tag-level-control">
          <p>{ __( 'HTML Tag' ) }</p>
          <ToolbarGroup
            icon={ <HeadingLevelIcon level={ level } /> }
            controls={ range( 1, 7 ).map( ( index ) =>
              createLevelControl( index, level )
            ) }
            label={ __( 'Change heading level' ) }
          />
        </div>
      ) }
      <br />
      <AdvancedAlignmentToolbar
        attributeName="textAlign"
        label={ __( 'Text Alignment', 'kili-builder' ) }
      />
      <AdvancedColorPalette
        label={ __( 'Heading Color', 'kili-builder' ) }
        attributeName="color"
        colors={ COLORS }
      />
      <AdvancedRangeControl
        label={ __( 'Font Size', 'kili-builder' ) }
        attributeName="fontSize"
        min={ 5 }
        max={ 200 }
        step={ 1 }
        dimension="px"
      />
      <AdvancedRangeControl
        label={ __( 'Font Weight', 'kili-builder' ) }
        attributeName="fontWeight"
        min={ 100 }
        max={ 900 }
        step={ 100 }
      />
      <AdvancedRangeControl
        label={ __( 'Line Height', 'kili-builder' ) }
        attributeName="lineHeight"
        min={ 0 }
        max={ 100 }
        step={ 1 }
        dimension="px"
      />
      <AdvancedRangeControl
        label={ __( 'Letter Spacing', 'kili-builder' ) }
        attributeName="letterSpacing"
        min={ -50 }
        max={ 50 }
        step={ 0.1 }
        dimension="px"
      />
    </PanelBody>
  );
}
