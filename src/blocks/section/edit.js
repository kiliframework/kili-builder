import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { SelectControl, Button, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const { useEffect, useState } = wp.element;

const ColumnsSettings = ( props ) => {
	const { onChangeValue, settings } = props;

	return (
		<>
			<div className="flexgrid">
				{ settings.map( ( col, index ) => {
					return (
						<div className="flexgrid__item" key={ index }>
							<TextControl
								label={ 'Size (columns)' }
								value={ col }
								onChange={ ( val ) => onChangeValue( val, index ) }
							/>
						</div>
					);
				} ) }
			</div>
		</>
	);
};

const MySelectControl = ( { size, onChangeColumns } ) => {
	return (
		<>
			<SelectControl
				label="Number of Columns: "
				value={ size }
				options={ [
					{ label: '1 Column', value: 1 },
					{ label: '2 Columns', value: 2 },
					{ label: '3 Columns', value: 3 },
					{ label: '4 Columns', value: 4 },
					{ label: '6 Columns', value: 6 },
					{ label: '12 Columns', value: 12 },
				] }
				onChange={ ( value ) => onChangeColumns( value ) }
			/>
		</>
	);
};

const Grid = ( { settings, clientId } ) => {
	const newTemplate = ( columns ) => {
		return columns.map( ( col, index ) => {
			return [ 'kili/k-column', { columns: `${ col }` } ];
		} );
	};
	return (
		<>
			<div className={ `kili-section__row kili-section__row-${ clientId }` }>
				<InnerBlocks template={ newTemplate( settings ) } />
			</div>
		</>
	);
};

const RowSectionEdit = ( { currentBlock, attributes, setAttributes, clientId, ...rest } ) => {
	const [ isCreated, setIsCreated ] = useState( attributes.isCreated );
	const [ size, setSize ] = useState( 2 );
	const [ settings, setSettings ] = useState( [ 6, 6 ] );
	const [ columnsStyle, setColumnsStyle ] = useState( '' );

	useEffect( () => {
		let newColumnsStyle = '';
		currentBlock.innerBlocks.map( ( innerBlock, index ) => {
			const numberOfColumns = innerBlock.attributes.columns;
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

	const toggleCreate = () => {
		setIsCreated( ! isCreated );
		setAttributes( { isCreated: ! isCreated } );
	};
	const onChangeColumns = ( value ) => {
		setSize( value );
		setSettings( fillArray( 12 / Number( value ), Number( value ) ) );
	};
	const onChangeValue = ( newValue, index ) => {
		const newSettings = [ ...settings ];
		newSettings[ index ] = newValue;
		setSettings( newSettings );
	};
	return (
		<>
			<div className="select-menu">
				{ ! isCreated && (
					<>
						<div className="flexgrid">
							<MySelectControl
								size={ size }
								onChangeColumns={ ( v ) => onChangeColumns( Number( v ) ) }
							/>
							<h2>Available column: 12</h2>
						</div>
						<ColumnsSettings
							size={ size }
							onChangeValue={ onChangeValue }
							settings={ settings }
						/>
						<Button onClick={ toggleCreate }>Create Grid</Button>
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
