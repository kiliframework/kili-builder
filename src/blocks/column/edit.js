import {
  ResizableBox,
} from '@wordpress/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';


import Inspector from './inspector';
import './editor.scss';
import { compose } from '@wordpress/compose';

const { useState, useEffect, useCallback } = wp.element;

function ColumnEdit( props ) {
  const { setAttributes, attributes, clientId, className, hasInnerBlocks,
    parentId } = props;
  const [ selectedWidth, setSelectedWidth ] = useState( 0 );
  const [ parentWidth, setParentWidth ] = useState( 0 );
  const [, setResizing ] = useState( false );
  const {
    padding,
    margin,
  } = attributes;

  useEffect( () => {
    const parentBlockWidth = document
      .querySelector( ( `.kili-columns > .kili-section__row-${ parentId } > .editor-inner-blocks > .editor-block-list__layout` ) )
      .getBoundingClientRect().width;
    setParentWidth( parentBlockWidth );
  }, [] );

  const getSnapTargets = useCallback(
    () => {
      const snapGap = parentWidth / 12;
      const initialSnapTarget = parentWidth / 12 - 30;
      const snapTargets = [ initialSnapTarget ];
      for ( let index = 1; index < 12; index++ ) {
        snapTargets.push( snapTargets[ index - 1 ] + snapGap );
      }
      return snapTargets;
    },
    [parentWidth],
  );

  return ( <>
    <Inspector { ...props } />
    <ResizableBox
      className={ className }
      snap={ { x: getSnapTargets() } }
      size={ { width: 'auto' } }
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
      onResizeStop={ ( _event, _direction, _elt, delta ) => {
        setResizing( false );
        const currentBlockWidth = selectedWidth + delta.width;
        const currentBlockWidthPercent =
            ( currentBlockWidth / parentWidth ) * 100;
        setAttributes( { columns: {
          ...attributes.columns,
          desktop: {
            ...attributes.columns.desktop,
            value: Math.round( ( currentBlockWidthPercent * 12 ) / 100 ),
          },
        } } );
      } }
      onResizeStart={ ( _event, _direction, _elt ) => {
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
          <InnerBlocks templateLock={ false } renderAppender={ ! hasInnerBlocks && InnerBlocks.ButtonBlockAppender } />
        </div>
      </div>
    </ResizableBox>

  </>
  );
}

const applyWithSelect = withSelect( ( select, { clientId } ) => {
  const { getBlock, getBlockRootClientId } = select( 'core/block-editor' );
  const parentId = getBlockRootClientId( clientId );
  const columnBlocks = getBlock( clientId );

  return {
    hasInnerBlocks: !! ( columnBlocks && columnBlocks.innerBlocks.length ),
    parentId,
  };
} );

export default compose( [ applyWithSelect ] )( ColumnEdit );
