import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import HtmlToReactParser from 'html-to-react';
import { children } from '@wordpress/blocks';

function BlockSave() {
  const sheet = new ServerStyleSheet();
  const html = renderToStaticMarkup(
    <StyleSheetManager sheet={ sheet.instance }>
      { children }
    </StyleSheetManager>
  );
  const styleTags = sheet.getStyleTags();
  console.log( sheet.getStyleElement() );
  sheet.seal();
  const htmlToReactParser = new HtmlToReactParser.Parser();
  const reactElement = htmlToReactParser.parse( html + styleTags );

  return (
    <>
      { reactElement }
    </> );
}

export default BlockSave;
