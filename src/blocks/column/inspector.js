
/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles } from '@wordpress/components';
import DimensionsControl from '../../components/DimensionsControl';
import applyWithColors from './colors';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	// verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		console.log( this.props );

		const {
			clientId,
			attributes,
			setAttributes,
			backgroundColor,
			setBackgroundColor,
			setTextColor,
			textColor,
			nextBlockClient,
			nextBlockClientId,
			lastId,
			updateBlockAttributes,
		} = this.props;

		const {
			columns,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			marginUnit,
			marginSyncUnits,
			marginSyncUnitsTablet,
			marginSyncUnitsMobile,
			marginSize,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopTablet,
			paddingRightTablet,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingUnit,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
			paddingSize,
		} = attributes;

		const onChangeWidth = ( newWidth ) => {
			console.log( newWidth );
			setAttributes( { columns: newWidth } );
		};

		return (
			<Fragment>
				<PanelBody title={ __( 'Column Settings', 'coblocks' ) } className="components-panel__body--column-settings">
					<DimensionsControl
						{ ...this.props }
						type="padding"
						label={ __( 'Padding', 'coblocks' ) }
						help={ __( 'Space inside of the container.', 'coblocks' ) }
						valueTop={ paddingTop }
						valueRight={ paddingRight }
						valueBottom={ paddingBottom }
						valueLeft={ paddingLeft }
						valueTopTablet={ paddingTopTablet }
						valueRightTablet={ paddingRightTablet }
						valueBottomTablet={ paddingBottomTablet }
						valueLeftTablet={ paddingLeftTablet }
						valueTopMobile={ paddingTopMobile }
						valueRightMobile={ paddingRightMobile }
						valueBottomMobile={ paddingBottomMobile }
						valueLeftMobile={ paddingLeftMobile }
						unit={ paddingUnit }
						syncUnits={ paddingSyncUnits }
						syncUnitsTablet={ paddingSyncUnitsTablet }
						syncUnitsMobile={ paddingSyncUnitsMobile }
						dimensionSize={ paddingSize }
					/>
					<DimensionsControl
						{ ...this.props }
						type="margin"
						label={ __( 'Margin', 'coblocks' ) }
						help={ __( 'Space around the container.', 'coblocks' ) }
						valueTop={ marginTop }
						valueRight={ marginRight }
						valueBottom={ marginBottom }
						valueLeft={ marginLeft }
						valueTopTablet={ marginTopTablet }
						valueRightTablet={ marginRightTablet }
						valueBottomTablet={ marginBottomTablet }
						valueLeftTablet={ marginLeftTablet }
						valueTopMobile={ marginTopMobile }
						valueRightMobile={ marginRightMobile }
						valueBottomMobile={ marginBottomMobile }
						valueLeftMobile={ marginLeftMobile }
						unit={ marginUnit }
						syncUnits={ marginSyncUnits }
						syncUnitsTablet={ marginSyncUnitsTablet }
						syncUnitsMobile={ marginSyncUnitsMobile }
						dimensionSize={ marginSize }
					/>
					{ ( lastId !== clientId )
						? (
							<RangeControl
								label={ __( 'Width (number of columns)', 'coblocks' ) }
								value={ columns }
								onChange={ ( newWidth ) => onChangeWidth( Number( newWidth ) ) }
								min={ 1 }
								max={ 12 }
								step={ 1 }
							/>
						)
						: null }
				</PanelBody>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
