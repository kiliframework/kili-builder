import ReactDOMServer from 'react-dom/server';

import { StyleSheetServer, StyleSheet } from 'aphrodite/no-important';
import HtmlToReactParser from 'html-to-react';

const styles = StyleSheet.create( {
  red: {
    backgroundColor: 'red',
  },

  blue: {
    backgroundColor: 'blue',
  },

  hover: {
    ':hover': {
      backgroundColor: 'red',
    },
  },

  small: {
    '@media (max-width: 600px)': {
      backgroundColor: 'red',
    },
  },
} );

function BlockSave( { children } ) {
  let reactElement;
  try {
    console.log( children );
    const { html, css } = StyleSheetServer.renderStatic(
      () => ReactDOMServer.renderToString( children ) );
    const htmlToReactParser = new HtmlToReactParser.Parser();
    console.log( html );

    console.log( css );

    reactElement = htmlToReactParser.parse( html + css ); // or sheet.getStyleElement();
  } catch ( error ) {
    // handle error
    console.error( 'error ren', error );
  }

  return (
    <>
      { children }
    </> );
}

export default BlockSave;
