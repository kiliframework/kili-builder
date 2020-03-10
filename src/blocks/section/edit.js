import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { SelectControl, Button, TextControl, Placeholder, ButtonGroup, Tooltip } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import ColumnDefaultAttributes from '../column/attributes';
import Inspector from './inspector';

const { useEffect, useState } = wp.element;

const Grid = ( { settings, clientId } ) => {
  const newTemplate = ( columns ) => {
    return columns.map( ( col, index ) => {
      return [ 'kili/k-column', {
        columns: {
          ...ColumnDefaultAttributes.columns.default,
          desktop: {
            ...ColumnDefaultAttributes.columns.default.desktop,
            value: col,
          },
        },
      } ];
    } );
  };
  return (
    <>
      <div className={ `kili-section__row kili-section__row-${ clientId }` }>
        <InnerBlocks template={ newTemplate( settings ) } renderAppender={ false } />
      </div>
    </>
  );
};

const columnOptions = [
  { columns: 1, name: __( 'One Column', 'kili-builder' ) },
  { columns: 2, name: __( 'Two Columns', 'kili-builder' ) },
  { columns: 3, name: __( 'Three Columns', 'kili-builder' ) },
  { columns: 4, name: __( 'Four Columns', 'kili-builder' ) },
  { columns: 5, name: __( 'Five Columns', 'kili-builder' ) },
  { columns: 6, name: __( 'Six Columns', 'kili-builder' ) },
];

const RowSectionEdit = ( { currentBlock, attributes, setAttributes, clientId, ...rest } ) => {
  const [ isCreated, setIsCreated ] = useState( attributes.isCreated );
  const [ settings, setSettings ] = useState( [ 6, 6 ] );
  const [ columnsStyle, setColumnsStyle ] = useState( '' );

  useEffect( () => {
    let newColumnsStyle = '';
    currentBlock.innerBlocks.forEach( ( innerBlock, index ) => {
      const numberOfColumns = innerBlock.attributes.columns.desktop.value;
      newColumnsStyle += `.kili-columns > .kili-section__row-${ clientId } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kili/k-column"]:nth-child(${ index + 1 }) {
        flex-basis: ${ ( numberOfColumns / 12 ) * 100 }%;
        margin-left: 0;
        margin-right: 0;
      }`;
    } );
    setColumnsStyle( newColumnsStyle );
  }, [ currentBlock ] );

  const fillArray = ( value, len ) => {
    if ( len === 0 ) {
      return [];
    }
    let a = [ value ];
    while ( a.length * 2 <= len ) {
      a = a.concat( a );
    }
    if ( a.length < len ) {
      a = a.concat( a.slice( 0, len - a.length ) );
    }
    return a;
  };

  const handleColumnsSelect = ( value ) => {
    setSettings( fillArray( 12 / Number( value ), Number( value ) ) );
    setIsCreated( ! isCreated );
    setAttributes( { isCreated: ! isCreated } );
  };

  return (
    <>
      <div className="select-menu">
        { ! isCreated && (
          <>
            <Placeholder
              label={ __( 'Row', 'kili-builder' ) }
              instructions={ __( 'Select the number of columns for this row.', 'kili-builder' ) }
            >
              <ButtonGroup className="components-kili-button-group">
                { columnOptions.map( ( option, index ) => (
                  <Button
                    key={ option.name }
                    className="components-kili-button-group__button"
                    isLarge
                    onClick={ () => handleColumnsSelect( option.columns ) }
                  >
                    { index + 1 }
                  </Button>
                ) ) }
              </ButtonGroup>
            </Placeholder>
          </>
        ) }
      </div>
      <div className="kili-columns">
        { isCreated && <Grid settings={ settings } clientId={ clientId } /> }
      </div>
      <style>
        { columnsStyle }
      </style>
    </>
  );
};

export default withSelect( ( select, ownProps ) => {
  return ( {
    currentBlock: select( 'core/block-editor' ).getBlock( ownProps.clientId ),
  } );
} )( RowSectionEdit );
