import applyWithColors from './colors';
import DimensionsControl from '../../components/DimensionsControl';

import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, withFallbackStyles, TabPanel, Icon } from '@wordpress/components';


const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

class Inspector extends Component {
	render() {
		const {
			clientId,
			attributes,
			setAttributes,
			lastId,
		} = this.props;

		const {
			columns,
			currentTab,
			marginSize,
			paddingSize,
		} = attributes;

		const onChangeWidth = ( newWidth ) => {			
			setAttributes( { columns: `${newWidth}` } );
		};

		const onTabSelect = ( tabName ) => {
			setAttributes( { currentTab: tabName } );
		};

		const getValuesByDevice = ( type ) => {
			let values = {};			
			values = {
				valueTop: attributes[type][currentTab].directions.top,
				valueBottom: attributes[type][currentTab].directions.bottom,
				valueRight: attributes[type][currentTab].directions.right,
				valueLeft: attributes[type][currentTab].directions.left,
			};
			
			return values;
		};

		return (
			<InspectorControls>
				<TabPanel
					className="kt-inspect-tabs"
					activeClass="active-tab"
					initialTabName={ currentTab }
					onSelect={ onTabSelect }
					tabs={ [
						{
							name: 'desktop',
							title: <Icon icon="desktop" />,
							className: '',
						},
						{
							name: 'tablet',
							title: <Icon icon="tablet" />,
							className: '',
						},
						{
							name: 'mobile',
							title: <Icon icon="smartphone" />,
							className: '',
						},
					] }
				>
					{ ( tab ) => {
						return (
							<>
								<PanelBody title={ __( 'Column Settings', 'coblocks' ) } className="components-panel__body--column-settings">
									<DimensionsControl
										{ ...this.props }
										device={ tab.name }
										type={ 'padding' }
										label={ __( 'Padding', 'coblocks' ) }
										help={ __( 'Space inside of the container.', 'coblocks' ) }
										{ ...getValuesByDevice( 'padding' ) }
										dimensionSize={ paddingSize }
									/>
									<DimensionsControl 
										{ ...this.props }
										device={ tab.name }
										type={ 'margin' }
										label={ __( 'Margin', 'coblocks' ) }
										help={ __( 'Space around the container.', 'coblocks' ) }
										{ ...getValuesByDevice( 'margin' ) }
										dimensionSize={ marginSize }
									/>
									{ ( lastId !== clientId )
										? <RangeControl
											label={ __( 'Width (number of columns)', 'coblocks' ) }
											value={ Number(columns) }
											onChange={ ( newWidth ) => onChangeWidth( Number( newWidth ) ) }
											min={ 1 }
											max={ 12 }
											step={ 1 }
										/>
										: null }
								</PanelBody>
							</> );
					} }
				</TabPanel>
			</InspectorControls>

		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
