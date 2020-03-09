/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */

import { Component } from '@wordpress/element';
import {
  RangeControl,
  PanelBody,
  TabPanel,
  PanelRow,
  ResizableBox,
} from '@wordpress/components';
import { Icon } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

import save from './save';
import Inspector from './inspector';
import './editor.scss';
import { compose } from '@wordpress/compose';

const { useState, useEffect } = wp.element;

function ColumnEdit( props ) {
  const { setAttributes, attributes, clientId, className, hasInnerBlocks,
		parentId,
		nextBlockClient,
		nextBlockClientId, } = props;
	const [ selectedWidth, setSelectedWidth ] = useState( 0 );
	const [parentWidth, setParentWidth] = useState(0);
  const [ maxWidth, setMaxWidth ] = useState( 99999 );
  const [ resizing, setResizing ] = useState( false );
	const {
    padding,
    margin,
	} = attributes;

	useEffect(() => {
		const parentBlockWidth = document
							.querySelector(( `.kili-columns > .kili-section__row-${parentId} > .editor-inner-blocks > .editor-block-list__layout` ))
							.getBoundingClientRect().width;		
		setParentWidth(parentBlockWidth);
	}, []);
	
	const getSnapTargets = () => {
		const snapGap = parentWidth/12;
		const initialSnapTarget = parentWidth/12 - 30;
		const snapTargets = [initialSnapTarget];
		for (let index = 1; index < 12; index++) {
			snapTargets.push(snapTargets[index-1] + snapGap);
		}
		return snapGap;
	}
	
  return (
    <>
      <Inspector { ...props } />
      <ResizableBox
        className={className}
				maxWidth={ maxWidth }
				snap={{ x: getSnapTargets()}}
				defaultSize="50"
        minHeight="20"
        enable={ {
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        } }
        onResizeStop={ () => setResizing( true ) }
        onResize={ ( _event, _direction, _elt, delta ) => {
							
							
						const currentBlockWidth = selectedWidth + delta.width;						
						const currentBlockWidthPercent =
							( currentBlockWidth / parentWidth ) * 100;				
						console.log(currentBlockWidthPercent);
								
						setAttributes( { columns: {
							...attributes.columns,
							desktop: {
								...attributes.columns.desktop,
								value: Math.ceil((currentBlockWidthPercent*12)/100),
							}
						}} );
						
        } }
        onResizeStart={ ( _event, _direction, _elt, delta ) => {
          const currentBlock = document.getElementById(
            'block-' + clientId
          );
					const currentBlockClientRect = currentBlock.getBoundingClientRect();
					setSelectedWidth( currentBlockClientRect.width );
          setResizing( true );
        } }
      >
        <div
          // className={ classes }
          // style={ { color: textColor.color } }
        >
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
            <InnerBlocks templateLock={ false } renderAppender={ InnerBlocks.ButtonBlockAppender } />
          </div>
        </div>
      </ResizableBox>

    </>
  );
}

const applyWithSelect = withSelect( ( select, { clientId } ) => {
	const { getBlock, getBlockRootClientId, getNextBlockClientId, getPreviousBlockClientId, getBlocksByClientId } = select( 'core/block-editor' );
	const parentId = getBlockRootClientId( clientId );
	const columnBlocks = getBlock( clientId );

	const nextBlockClientId = getNextBlockClientId( clientId ) || getPreviousBlockClientId( clientId );
	const nextBlockClient = getBlock( nextBlockClientId );
	
	const parentBlocks = getBlocksByClientId( parentId );
	
	const lastId = ( parentBlocks[ 0 ].innerBlocks !== 'undefined' ) ? parentBlocks[ 0 ].innerBlocks[ parentBlocks[ 0 ].innerBlocks.length - 1 ].clientId : clientId;

	return {
		hasInnerBlocks: !! ( columnBlocks && columnBlocks.innerBlocks.length ),
		parentId,
		nextBlockClient,
		nextBlockClientId,

		// Used in inspector
		lastId,
		parentBlocks,
	};
} );

export default compose([ applyWithSelect ])(ColumnEdit)
