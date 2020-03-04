/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './icons';
import DimensionsSelect from './DimensionsSelect';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { ButtonGroup, BaseControl, Button, Tooltip, TabPanel } from '@wordpress/components';

class DimensionsControl extends Component {
	constructor( props ) {
		super( ...arguments );
		this.onChangeTop = this.onChangeTop.bind( this );
		this.onChangeRight = this.onChangeRight.bind( this );
		this.onChangeBottom = this.onChangeBottom.bind( this );
		this.onChangeLeft = this.onChangeLeft.bind( this );
		this.onChangeSize = this.onChangeSize.bind( this );

		if ( props.attributes.saveCoBlocksMeta ) {
			dispatch( 'core/block-editor' ).updateBlockAttributes( props.attributes.clientId, { saveCoBlocksMeta: false } );
		}
	}

	onChangeTop( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingTop' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginTop' + device ]: value } );
		}
	}

	onChangeRight( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingRight' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginRight' + device ]: value } );
		}
	}

	onChangeBottom( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingBottom' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginBottom' + device ]: value } );
		}
	}

	onChangeLeft( value, device ) {
		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { [ 'paddingLeft' + device ]: value } );
		} else {
			this.props.setAttributes( { [ 'marginLeft' + device ]: value } );
		}
	}

	onChangeSize( value, size ) {
		//fix reset for specific blocks
		if ( [ 'coblocks/hero' ].includes( this.props.name ) && value === 'no' ) {
			if ( size < 0 ) {
				value = 'huge';
				size = 60;
			} else {
				size = -1;
			}
		}

		if ( this.props.type === 'padding' ) {
			this.props.setAttributes( { paddingSyncUnits: true } );
			this.props.setAttributes( { paddingSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				this.props.setAttributes( { paddingTop: size, paddingRight: size, paddingBottom: size, paddingLeft: size, paddingUnit: 'px' } );
			}
		} else {
			this.props.setAttributes( { marginSize: value } );
			if ( size ) {
				if ( size < 0 ) {
					size = '';
				}
				this.props.setAttributes( { marginTop: size, marginRight: 0, marginBottom: size, marginLeft: 0, marginUnit: 'px' } );
			}
		}
	}

	render() {
		const {
			device,
			help,
			instanceId,
			label = __( 'Margin', 'coblocks' ),
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
			this.onChangeTop( newValue, device );
		};

		const onChangeRightValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeRight( newValue, device );
		};

		const onChangeBottomValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeBottom( newValue, device );
		};

		const onChangeLeftValue = ( event ) => {
			const newValue = ( event.target.value === '' ) ? undefined : Number( event.target.value );
			this.onChangeLeft( newValue, device );
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
										__( '%s Units', 'coblocks' ),

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
										value={ valueTop }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeRightValue }
										value={ valueRight }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeBottomValue }
										value={ valueBottom }
										min={ type === 'padding' ? 0 : undefined }
									/>
									<input
										className="components-coblocks-dimensions-control__number"
										type="number"
										onChange={ onChangeLeftValue }
										value={ valueLeft !== '' ? valueLeft : '' }
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

export default withInstanceId( DimensionsControl );
