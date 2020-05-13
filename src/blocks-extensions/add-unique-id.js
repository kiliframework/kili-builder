import { v4 as uuid } from 'uuid';

const { addFilter } = wp.hooks;

function addUniqueID( settings, name ) {
  if ( name.startsWith( 'kili' ) && ! settings.attributes.uniqueID ) {
    settings.attributes.uniqueID = {
      type: 'string',
      source: 'attribute',
      selector: 'div',
      attribute: 'data-unique-id',
      default: uuid().substr( 0, 7 ),
    };
  }
  return settings;
}

addFilter( 'blocks.registerBlockType', 'kili-builder/addUniqueId', addUniqueID );
