import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import './style.scss';
import { attrClassCreator } from '../utils';
import { DESKTOP, BREAKPOINTS_VALUES } from '../../constants';
import BlockSave from '../../components/BlockSave/BlockSave';
import { saveStyleCreator } from '../utils/saveStyleCreator';
import { styled } from 'linaria/react';
import { css } from 'linaria';
const Container = styled.div`
  max-width: ${ ( { attributes } ) => attributes.maxWidth.desktop.value };
  @media only screen and (max-width: ${ BREAKPOINTS_VALUES.tablet }){ 
    max-width: ${ ( { attributes } ) => attributes.maxWidth.tablet.value };
  }
`;
export default function ContainerSave( { attributes } ) {
  const a = 50;
  const lol = css`
    ${ `max-width: ${ attributes.maxWidth.desktop.value } ` }
  `;
  return (
    <Container className={ lol } attributes={ attributes }>
      <InnerBlocks.Content />
    </Container>
  );
}
