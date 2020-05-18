
import { TabPanel } from '@wordpress/components';
import { NORMAL, HOVER } from '../constants/pseudoClasses';
import { __ } from '@wordpress/i18n';

const { useContext, createContext } = wp.element;

const PseudoTabContext = createContext( { name: undefined } );

export function PseudoTabProvider( { children } ) {
  return (
    <TabPanel
      className="kt-inspect-tabs kt-hover-tabs"
      activeClass="active-tab"
      tabs={ [
        {
          name: NORMAL,
          title: __( 'Normal' ),
        },
        {
          name: HOVER,
          title: __( 'Hover' ),
        },
      ] }
    >
      { ( tab ) => {
        return (
          <>
            <PseudoTabContext.Provider value={ tab }>
              { typeof children === 'function' ? children( tab ) : children }
            </PseudoTabContext.Provider>
          </>
        );
      } }
    </TabPanel>

  );
}

export function usePseudoTab() {
  const context = useContext( PseudoTabContext );
  return context;
}
