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

import Inspector from './inspector';

const { useState, useEffect } = wp.element;

export default function ColumnEdit( props ) {
	const { setAttributes, attributes } = props;

	const {
		columns,
		align,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
	} = attributes;

	return (
		<>
			<Inspector { ...props } />
			<div
				id="column create"
				style={ {
					paddingTop: `${ paddingTop ? paddingTop : 0 }px`,
					paddingBottom: `${ paddingBottom ? paddingBottom : 0 }px`,
					paddingLeft: `${ paddingLeft ? paddingLeft : 0 }px`,
					paddingRight: `${ paddingRight ? paddingRight : 0 }px`,
				} }
			>
				<InnerBlocks />
			</div>
		</>
	);
}
