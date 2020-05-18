import { createHigherOrderComponent } from '@wordpress/compose';
import { ClientIDProvider } from '../hooks/useClientID';
/**
 *
 * @return {Function} Component with ClientIDProvider, so the value can be accesed with useClientID.
 *  */
const withClientID = createHigherOrderComponent(
  ( WrappedComponent ) => ( props ) => {
    return (
      <ClientIDProvider clientID={ props.clientId } setAttributes={ props.setAttributes }>
        <WrappedComponent { ...props } />
      </ClientIDProvider>
    );
  },
  'withClientID'
);

export default withClientID
;
