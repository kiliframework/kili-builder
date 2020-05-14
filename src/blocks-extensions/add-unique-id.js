import { v4 as uuid } from 'uuid';

const { addFilter } = wp.hooks;

/* This function will be called for every block to be registered. We are adding a uniqueClassName attribute to
   every Kili-Builder block */
function addUniqueID( settings, name ) {
  if ( name.startsWith( 'kili' ) && ! settings.attributes.uniqueID ) {
    settings.attributes.uniqueClassName = {
      type: 'string',
      default: '',
    };
  }
  return settings;
}

addFilter( 'blocks.registerBlockType', 'kili-builder/addUniqueId', addUniqueID );
