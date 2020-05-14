import classnames from 'classnames';

import icons from './icons';

import { __, sprintf } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';

import './editor.scss';

export default function DimensionsControl( { device,
  label = __( 'Margin', 'kili-builder' ),
  type = 'margin',
  setAttributes,
  attributes,
} ) {
  const classes = classnames(
    'components-base-control',
    'components-kili-dimensions-control', {
    }
  );
  const onChangeDirection = ( event, direction ) => {
    const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
    setAttributes( { [ `${ type }${ direction }` ]: {
      ...attributes[ `${ type }${ direction }` ],
      [ device ]: {
        ...attributes[ `${ type }${ direction }` ][ device ],
        value: `${ newValue }px`,
      },
    } } );
  };

  return (
    <>
      <div className={ classes }>
        <>
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
              onChange={ ( e ) => onChangeDirection( e, 'Top' ) }
              value={ parseFloat( attributes[ `${ type }Top` ][ device ]?.value ) || 0 }
              min={ type === 'padding' ? 0 : undefined }
            />
            <input
              className="components-kili-dimensions-control__number"
              type="number"
              onChange={ ( e ) => onChangeDirection( e, 'Right' ) }
              value={ parseFloat( attributes[ `${ type }Right` ][ device ]?.value ) ? parseFloat( attributes[ `${ type }Right` ][ device ].value ) : 0 }
              min={ type === 'padding' ? 0 : undefined }
            />
            <input
              className="components-kili-dimensions-control__number"
              type="number"
              onChange={ ( e ) => onChangeDirection( e, 'Bottom' ) }
              value={ parseFloat( attributes[ `${ type }Bottom` ][ device ]?.value ) ? parseFloat( attributes[ `${ type }Bottom` ][ device ].value ) : 0 }
              min={ type === 'padding' ? 0 : undefined }
            />
            <input
              className="components-kili-dimensions-control__number"
              type="number"
              onChange={ ( e ) => onChangeDirection( e, 'Left' ) }
              value={ parseFloat( attributes[ `${ type }Left` ][ device ]?.value ) ? parseFloat( attributes[ `${ type }Left` ][ device ].value ) : 0 }
              min={ type === 'padding' ? 0 : undefined }
            />
            <Tooltip text={ __( 'Reset', 'kili-builder' ) } >
              <Button
                className="components-kili-dimensions-control__sync"
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
      </div>
    </>
  );
}
