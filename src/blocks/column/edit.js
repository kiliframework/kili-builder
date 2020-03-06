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
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

import save from './save';
import Inspector from './inspector';
import './editor.scss';

const { useState, useEffect } = wp.element;

export default function ColumnEdit( props ) {
  const { setAttributes, attributes, clientId } = props;
  const [ selectedWidth, setSelectedWidth ] = useState( 0 );
  const [ maxWidth, setMaxWidth ] = useState( 99999 );
  const [ resizing, setResizing ] = useState( false );

  const parentId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( clientId );

  const {
    padding,
    margin,
  } = attributes;

  return (
    <>
      <Inspector { ...props } />
      <ResizableBox
        className={ classnames( 'is-selected-column', 'is-resizing') }
        maxWidth={ maxWidth }
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
          console.log( delta );
        } }
        onResizeStart={ () => {
          const currentBlock = document.getElementById(
            'block-' + clientId
          );
          const currentBlockClientRect = currentBlock.getBoundingClientRect();
          setSelectedWidth( currentBlockClientRect );
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
