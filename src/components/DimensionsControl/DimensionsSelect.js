import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

const utilitySizes = [
  {
    name: __( 'None', 'kili-builder' ),
    size: 0,
    slug: 'no',
  },
  {
    name: __( 'Small', 'kili-builder' ),
    size: 14,
    slug: 'small',
  },
  {
    name: __( 'Medium', 'kili-builder' ),
    size: 24,
    slug: 'medium',
  },
  {
    name: __( 'Large', 'kili-builder' ),
    size: 34,
    slug: 'large',
  },
  {
    name: __( 'Huge', 'kili-builder' ),
    size: 60,
    slug: 'huge',
  },
];

export default function DimensionsSelect({ paddingSize, marginSize, type,setAttributes }) {

  const getSelectValuesFromUtilitySizes = ( listOfSizes, value ) => {
    let selectedPreset;
    if ( typeof value === 'string' ) {
      selectedPreset = listOfSizes.find( ( choice ) => choice.slug === value );
      return selectedPreset ? selectedPreset.slug : 'custom';
    }
  }

  const getCurrentSelectValue = ( type ) => {
    switch ( type ) {
      case 'margin':
        return marginSize;
      case 'padding':
        return paddingSize;
      default:
    }
  }

  const setCurrentSelectValue = ( newSetting ) => {
    switch ( type ) {
      case 'margin':
        setAttributes( { marginSize: newSetting } );
        break;
      case 'padding':
        setAttributes( { paddingSize: newSetting } );
        break;
      default:
    }
  }

  const onChangeValue = ( event ) => {
    const selectedUtil = utilitySizes.find( ( util ) => util.slug === event );
    if ( selectedUtil ) {
      setCurrentSelectValue(
        getSelectValuesFromUtilitySizes( utilitySizes, selectedUtil.slug )
      );
    }
  }

  const getSelectOptions = ( optionsArray ) => {
    return [
      ...optionsArray.map( ( option ) => ( {
        value: option.slug,
        label: option.name,
      } ) ),
    ];
  }

  return (
    <>
      <SelectControl
        className={ 'components-font-size-picker__select' }
        label={ `Choose ${ type } preset` }
        hideLabelFromVision={ true }
        value={ getCurrentSelectValue( type ) }
        onChange={ onChangeValue }
        options={ getSelectOptions( utilitySizes ) }
      />
    </>
  );
}

