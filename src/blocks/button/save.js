import { RichText } from '@wordpress/block-editor';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { attrClassCreator } from '../utils';
import { saveStyleCreator } from '../utils/saveStyleCreator';
import { renderToStaticMarkup } from 'react-dom/server';
import HtmlToReactParser from 'html-to-react';
import BlockSave from '../../components/BlockSave/BlockSave';

function SaveButton( { attributes } ) {
  const { text } = attributes;

  const styles = saveStyleCreator( attributes );

  return (
    <BlockSave>
      <button className={ classnames( 'button' ) }>
        <RichText.Content
          value={ text }
        />
      </button>
    </BlockSave>
  );
}

export default SaveButton;
