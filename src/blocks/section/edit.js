import { InnerBlocks } from '@wordpress/block-editor';
import { Button, Placeholder, ButtonGroup } from '@wordpress/components';
import { useSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

import { times, dropRight } from 'lodash';

import ColumnDefaultAttributes from '../column/attributes';
import Inspector from './inspector';

const { useEffect, useState } = wp.element;

const Grid = ( { template, clientId } ) => {
  return (
    <>
      <div className={ `kili-section__row kili-section__row-${ clientId }` }>
        <InnerBlocks template={ template } renderAppender={ false } />
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

const RowSectionEdit = ( props ) => {
  const { attributes, setAttributes, clientId } = props;
  const currentBlock = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ) );
  const { justifyContent, alignItems, isCreated } = attributes;
  const [ columnsStyle, setColumnsStyle ] = useState( '' );
  const [ rowStyle, setRowStyle ] = useState( '' );
  const [ settings, setSettings ] = useState( [] );

  useEffect( () => {
    const newRowStyle = `.kili-section__row-${ clientId } > .editor-inner-blocks > .editor-block-list__layout {
      display: flex;
      justify-content: ${ justifyContent.desktop.value };
      align-items: ${ alignItems.desktop.value };
      flex-wrap: wrap;
    }`;
    setRowStyle( newRowStyle );
  }, [ justifyContent.desktop.value, alignItems.desktop.value ] );

  useEffect( () => {
    let newColumnsStyle = '';
    currentBlock.innerBlocks.forEach( ( innerBlock, index ) => {
      const numberOfColumns = innerBlock.attributes.columns.desktop.value;
      newColumnsStyle += `.kili-section__row-${ clientId } > .editor-inner-blocks > .editor-block-list__layout > [data-type="kili/k-column"]:nth-child(${ index + 1 }) {
        flex-basis: ${ ( numberOfColumns / 12 ) * 100 }%;
        max-width: ${ ( numberOfColumns / 12 ) * 100 }%;
        flex-shrink: 0;
        margin-left: 0;
        margin-right: 0;
      }`;
    } );
    setColumnsStyle( newColumnsStyle );
  }, [ currentBlock ] );

  const newTemplate = ( columnsTemplate ) => {
    return columnsTemplate.map( ( col ) => {
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
    setAttributes( { isCreated: ! isCreated, columns: value } );
  };

  return (
    <>
      <Inspector { ...props } />
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
        { isCreated && <Grid template={ newTemplate( settings ) } clientId={ clientId } /> }
      </div>
      <style>
        { rowStyle }
        { columnsStyle }
      </style>
    </>
  );
};

export default withDispatch( ( dispatch, ownProps, registry ) => {
  return ( {
    updateColumns( previousColumns, newColumns ) {
      const { clientId } = ownProps;
      const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
      const { getBlocks } = registry.select( 'core/block-editor' );

      let innerBlocks = getBlocks( clientId );

      const isAddingColumn = newColumns > previousColumns;

      if ( isAddingColumn ) {
        innerBlocks = [
          ...innerBlocks,
          ...times( newColumns - previousColumns, () => {
            return createBlock( 'kili/k-column', {
              columns: {
                ...ColumnDefaultAttributes.columns.default,
                desktop: {
                  ...ColumnDefaultAttributes.columns.default.desktop,
                  value: 12 / newColumns,
                },
              },
            } );
          } ),
        ];
      } else {
        innerBlocks = dropRight(
          innerBlocks,
          previousColumns - newColumns
        );
      }

      replaceInnerBlocks( clientId, innerBlocks, false );
    },
  } );
} )( RowSectionEdit );
