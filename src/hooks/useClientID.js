
const { useContext, createContext } = wp.element;

const ClientIDContext = createContext();

export function ClientIDProvider( { children, clientID } ) {
  return (
    <ClientIDContext.Provider value={ clientID }>
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
