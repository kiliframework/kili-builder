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
	const { columns, padding, margin } = attributes;
	const createClass = ( ) => {
		let classes = '';
		for ( const device of Object.keys( padding ) ) {
      let cssProperty = '';      
			for (const direction of Object.keys(padding[device].directions)) {
        if (padding[device].directions[direction]) {
          cssProperty += ` ${padding[device].prefix}--padding-${direction}__${padding[device].directions[direction]}`;
        }
      }
			classes += cssProperty;
		}
		for ( const device of Object.keys( margin ) ) {
      let cssProperty = '';      
			for (const direction of Object.keys(margin[device].directions)) {
        if (margin[device].directions[direction]) {
          cssProperty += ` ${margin[device].prefix}--margin-${direction}__${margin[device].directions[direction]}`;
        }
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
