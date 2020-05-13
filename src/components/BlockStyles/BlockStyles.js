import { BREAKPOINTS_VALUES, DESKTOP } from '../../constants';

function BlockStyles( { styles } ) {
  const stylesWithMediaQuery = () => {
    let newStyles = '';
    for ( const device in styles ) {
      let mediaQuery = '';
      if ( device === DESKTOP ) {
        mediaQuery = `@media screen and (max-width:${ BREAKPOINTS_VALUES[ device ] }){`;
      }
      for ( const [ selector, value ] of Object.entries( styles[ device ] ) ) {
        newStyles += `${ mediaQuery }${ selector }{ ${ value.join( '' ) } }`;
      }
    }
    return newStyles;
  };
  return (
    <style>
      { stylesWithMediaQuery() }
    </style> );
}

export default BlockStyles;
