import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import HtmlToReactParser from 'html-to-react';

function BlockSave( { children } ) {
  const sheet = new ServerStyleSheet();
  let reactElement;
  console.log( children );

  try {
    const html = renderToString(
      <>
        { children }

      </>
    );

    const styleTags = sheet.getStyleTags();
    const htmlToReactParser = new HtmlToReactParser.Parser();
    reactElement = htmlToReactParser.parse( html + styleTags ); // or sheet.getStyleElement();
  } catch ( error ) {
    // handle error
    console.error( 'error ren', error );
  } finally {
    sheet.seal();
  }

  return (
    <>
      { reactElement || children }
    </> );
}

export default BlockSave;
