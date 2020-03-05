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

import save from './save';
import Inspector from './inspector';
import './editor.scss';

const { useState, useEffect } = wp.element;

export default function ColumnEdit( props ) {
	const { setAttributes, attributes } = props;

	const {
		padding,
		margin
	} = attributes;
	
	return (
		<>
			<Inspector { ...props } />
			<div
				id="column create"
				style={ {
					marginTop: `${ margin.desktop.directions.top ? margin.desktop.directions.top : 0 }px`,
					marginBottom: `${ margin.desktop.directions.bottom ? margin.desktop.directions.bottom : 0 }px`,
					marginLeft: `${ margin.desktop.directions.left ? margin.desktop.directions.left : 0 }px`,
					marginRight: `${ margin.desktop.directions.right ? margin.desktop.directions.right : 0 }px`,
					paddingTop: `${ padding.desktop.directions.top ? padding.desktop.directions.top : 0 }px`,
					paddingBottom: `${ padding.desktop.directions.bottom ? padding.desktop.directions.bottom : 0 }px`,
					paddingLeft: `${ padding.desktop.directions.left ? padding.desktop.directions.left : 0 }px`,
					paddingRight: `${ padding.desktop.directions.right ? padding.desktop.directions.right : 0 }px`,
				} }
			>
				<InnerBlocks />
			</div>
		</>
	);
}
