
const { useContext, useMemo, createContext } = wp.element;

const ClientIDContext = createContext();

export function ClientIDProvider( { children, clientID, setAttributes } ) {
  const value = useMemo( () => ( { clientID, setAttributes } ), [] );

  return (
    <ClientIDContext.Provider value={ value }>
      { children }
    </ClientIDContext.Provider>

  );
}

export function useClientID() {
  const context = useContext( ClientIDContext );
  if ( ! context ) {
    throw new Error( `useClientID must be used within a ClientIDProvider` );
  }
  return context;
}
