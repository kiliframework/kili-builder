import { v4 as uuid } from 'uuid';

const { addFilter } = wp.hooks;

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
