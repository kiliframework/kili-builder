import { BREAKPOINTS_VALUES, DESKTOP } from '../../constants';

function BlockStyles( { styles } ) {
  const stylesWithMediaQuery = () => {
    let newStyles = '';
    for ( const device in styles ) {
      const mediaQuery = '';
      let deviceStyles = '';
      for ( const [ selector, value ] of Object.entries( styles[ device ] ) ) {
        deviceStyles += `${ mediaQuery }${ selector }{ ${ value.join( '' ) } }`;
      }

      if ( device !== DESKTOP ) {
        deviceStyles = `@media screen and (max-width:${ BREAKPOINTS_VALUES[ device ] }){${ deviceStyles }}`;
      }

      newStyles += deviceStyles;
    }
    return newStyles;
  };
  return (
    <style>
      { stylesWithMediaQuery() }
    </style> );
}

export default BlockStyles;
