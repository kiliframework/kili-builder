import classnames from 'classnames';

import icons from './icons';
import DimensionsSelect from './DimensionsSelect';

import { __, sprintf } from '@wordpress/i18n';
import { BaseControl, Button, Tooltip } from '@wordpress/components';

import './editor.scss';

export default function DimensionsControl( { device,
  help,
  label = __( 'Margin', 'kili-builder' ),
  type = 'margin',
  valueBottom,
  valueLeft,
  valueRight,
  valueTop,
  dimensionSize,
  setAttributes,
  attributes,
} ) {
  const { paddingSize, marginSize } = attributes;

  const classes = classnames(
    'components-base-control',
    'components-kili-dimensions-control', {
    }
  );
  const onChangeDirection = ( event, direction ) => {
    const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
    setAttributes( { [ type ]: {
      ...attributes[ type ],
      [ device ]: {
        ...attributes[ type ][ device ],
        directions: {
          ...attributes[ type ][ device ].directions,
          [ direction ]: newValue,
        },
      },
    } } );
  };

  const onChangeSize = ( value ) => {
    if ( type === 'padding' ) {
      setAttributes( { paddingSize: value } );
    } else {
      setAttributes( { marginSize: value } );
    }
  };

  return (
    <>
      <div className={ classes }>
        { dimensionSize === 'advanced'
          ? <>
            <div className="components-kili-dimensions-control__header">
              { label && <p className={ 'components-kili-dimensions-control__label' }>{ label }</p> }
              <div className="components-kili-dimensions-control__actions">
                <Tooltip text={ sprintf(
                  __( '%s Units', 'kili-builder' ),

                ) }>
                  <Button
                    isSmall
                  >
                    Px
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="components-kili-dimensions-control__inputs">
              <input
                className="components-kili-dimensions-control__number"
                type="number"
                onChange={ ( e ) => onChangeDirection( e, 'top' ) }
                value={ valueTop ? valueTop : 0 }
                min={ type === 'padding' ? 0 : undefined }
              />
              <input
                className="components-kili-dimensions-control__number"
                type="number"
                onChange={ ( e ) => onChangeDirection( e, 'right' ) }
                value={ valueRight ? valueRight : 0 }
                min={ type === 'padding' ? 0 : undefined }
              />
              <input
                className="components-kili-dimensions-control__number"
                type="number"
                onChange={ ( e ) => onChangeDirection( e, 'bottom' ) }
                value={ valueBottom ? valueBottom : 0 }
                min={ type === 'padding' ? 0 : undefined }
              />
              <input
                className="components-kili-dimensions-control__number"
                type="number"
                onChange={ ( e ) => onChangeDirection( e, 'left' ) }
                value={ valueLeft ? valueLeft : 0 }
                min={ type === 'padding' ? 0 : undefined }
              />
              <Tooltip text={ __( 'Reset', 'kili-builder' ) } >
                <Button
                  className="components-kili-dimensions-control__sync"
                  onClick={ () => onChangeSize( 'no', -1 ) }
                  isSmall
                >
                  { icons.sync }
                </Button>
              </Tooltip>
            </div>
            <div className="components-kili-dimensions-control__input-labels">
              <span className="components-kili-dimensions-control__number-label">{ __( 'Top', 'kili' ) }</span>
              <span className="components-kili-dimensions-control__number-label">{ __( 'Right', 'kili' ) }</span>
              <span className="components-kili-dimensions-control__number-label">{ __( 'Bottom', 'kili' ) }</span>
              <span className="components-kili-dimensions-control__number-label">{ __( 'Left', 'kili' ) }</span>
              <span className="components-kili-dimensions-control__number-label-blank"></span>
            </div>
          </>
          : <BaseControl id="textarea-1" label={ label } help={ help }>
            <div className="components-font-size-picker__controls">
              <DimensionsSelect
                type={ type }
                setAttributes={ setAttributes }
                paddingSize={ paddingSize }
                marginSize={ marginSize }
              />

              <Button
                type="button"
                onClick={ () => onChangeSize( 'advanced', '' ) }
                isSmall
                aria-label={ sprintf(
                  /* translators: %s: a texual label */
                  __( 'Advanced %s settings', 'kili' ),
                  label.toLowerCase()
                ) }
                isPrimary={ dimensionSize === 'advanced' }
              >
                { __( 'Advanced', 'kili' ) }
              </Button>
            </div>
          </BaseControl>
        }
      </div>
    </>
  );
}
