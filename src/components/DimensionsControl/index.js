import classnames from 'classnames';

import icons from './icons';
import DimensionsSelect from './DimensionsSelect';

import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BaseControl, Button, Tooltip } from '@wordpress/components';

class DimensionsControl extends Component {
	constructor( props ) {
		super( ...arguments );
		this.onChangeDirection = this.onChangeDirection.bind( this );
	}

	onChangeDirection( value, device, direction ) {
		const { attributes } = this.props;
			this.props.setAttributes( { [this.props.type]: {
				...attributes[this.props.type],
				[device]: {
					...attributes[this.props.type][device],
					directions: {
						...attributes[this.props.type][device].directions,
						[direction]: value,
					}
				}
			} } );
	}

	onChangeSize( value, size ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { paddingSize: value } );
		} else {
			this.props.setAttributes( { marginSize: value } );
		}
	}

	render() {
		const {
			device,
			help,
			label = __( 'Margin', 'kili-builder' ),
			type = 'margin',
			valueBottom,
			valueLeft,
			valueRight,
			valueTop,
			dimensionSize,
			setAttributes,
		} = this.props;

		const { paddingSize, marginSize } = this.props.attributes;

		const classes = classnames(
			'components-base-control',
			'components-coblocks-dimensions-control', {
			}
		);

		const onChangeTopValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeDirection( newValue, device, 'top' );
		};

		const onChangeRightValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeDirection( newValue, device, 'right' );
		};

		const onChangeBottomValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeDirection( newValue, device, 'bottom' );
		};

		const onChangeLeftValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeDirection( newValue, device, 'left' );
		};

		return (
			<>
				<div className={ classes }>
					{ dimensionSize === 'advanced'
						? <>
							<div className="components-coblocks-dimensions-control__header">
								{ label && <p className={ 'components-coblocks-dimensions-control__label' }>{ label }</p> }
								<div className="components-coblocks-dimensions-control__actions">
									<Tooltip text={ sprintf(
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										__( '%s Units', 'kili-builder' ),

									) }>
										<Button
											className={ 'components-coblocks-dimensions-control__units--' + name }
											isSmall
										>
											Px
										</Button>
									</Tooltip>
								</div>
							</div>
							<>
								<div className="components-coblocks-dimensions-control__inputs">
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeTopValue }
										value={ valueTop ? valueTop : 0 }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeRightValue }
										value={ valueRight ? valueRight : 0 }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeBottomValue }
										value={ valueBottom ? valueBottom : 0 }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeLeftValue }
										value={ valueLeft ? valueLeft : 0 }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<Tooltip text={ __( 'Reset', 'kili-builder' ) } >
										<Button
											className="components-coblocks-dimensions-control_sync"
											onClick={ () => this.onChangeSize( 'no', -1 ) }
											data-device-type=""
											isSmall
										>
											{ icons.sync }
										</Button>
									</Tooltip>
								</div>
							</>
							<div className="components-coblocks-dimensions-control__input-labels">
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Top', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Right', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Bottom', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label">{ __( 'Left', 'coblocks' ) }</span>
								<span className="components-coblocks-dimensions-control__number-label-blank"></span>
							</div>
						</>
						:						<BaseControl id="textarea-1" label={ label } help={ help }>
							<div className="components-font-size-picker__controls">
								<DimensionsSelect
									type={ type }
									setAttributes={ setAttributes }
									paddingSize={ paddingSize }
									marginSize={ marginSize }
								/>

								<Button
									type="button"
									onClick={ () => this.onChangeSize( 'advanced', '' ) }
									isSmall
									aria-label={ sprintf(
										/* translators: %s: a texual label */
										__( 'Advanced %s settings', 'coblocks' ),
										label.toLowerCase()
									) }
									isPrimary={ dimensionSize === 'advanced' }
								>
									{ __( 'Advanced', 'coblocks' ) }
								</Button>
							</div>
						</BaseControl>
					}
				</div>
			</>
		);
	}
}

export default DimensionsControl;
