import { Component } from '@wordpress/element';
import {
	RangeControl,
	PanelBody,
	TabPanel,
	PanelRow,
} from '@wordpress/components';
import { Icon } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ColumnSave( { attributes } ) {
	const { columns } = attributes;
	const createClass = ( ) => {
		let classes = '';

		//TO-DO: REFACTOR.
		for ( const value of Object.keys( attributes ) ) {
			let cssProperty = '.';
			let device = '';

			if ( value.includes( 'Mobile' ) ) {
				cssProperty += 'sm--';
				device = 'Mobile';
			} else if ( value.includes( 'Tablet' ) ) {
				cssProperty += 'md--';
				device = 'Tablet';
			} else {
				cssProperty += 'lg--';
				device = '';
			}
			if ( value.includes( 'paddingTop' ) ) {
				cssProperty += `padding-top__${ attributes[ `paddingTop${ device }` ] }`;
			} else if ( value.includes( 'paddingBottom' ) ) {
				cssProperty += `padding-bottom__${ attributes[ `paddingBottom${ device }` ] }`;
			} else if ( value.includes( 'paddingLeft' ) ) {
				cssProperty += `padding-left__${ attributes[ `paddingLeft${ device }` ] }`;
			} else if ( value.includes( 'paddingRight' ) ) {
				cssProperty += `padding-right__${ attributes[ `paddingRight${ device }` ] }`;
			}

			if ( value.includes( 'marginTop' ) ) {
				cssProperty += `margin-top__${ attributes[ `marginTop${ device }` ] }`;
			} else if ( value.includes( 'marginBottom' ) ) {
				cssProperty += `margin-bottom__${ attributes[ `marginBottom${ device }` ] }`;
			} else if ( value.includes( 'marginLeft' ) ) {
				cssProperty += `margin-left__${ attributes[ `marginLeft${ device }` ] }`;
			} else if ( value.includes( 'marginRight' ) ) {
				cssProperty += `margin-right__${ attributes[ `marginRight${ device }` ] }`;
			}

			classes += cssProperty;
		}

		return classes;
	};

	const createBasis = ( col ) => {
		let value = '';
		if ( col ) {
			const fbasis = ( Number( col ) / 12 ) * 100;
			value += `flex-basis__${ fbasis } `;
		}
		return value;
	};

	const className = createClass();

	const basis = createBasis( columns );
	return (
		<div className={ `flexgrid__item ${ basis }` }>
			<div className={ `kili-column-inner ${ className }` }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
