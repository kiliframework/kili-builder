
import { Icon, TabPanel } from '@wordpress/components';
import { DESKTOP } from '../constants';

const { useContext, createContext } = wp.element;

const DeviceTabContext = createContext( { name: DESKTOP } );

export function DeviceTabProvider( { children } ) {
  return (
    <TabPanel
      className="kt-inspect-tabs"
      activeClass="active-tab"
      initialTabName="desktop"
      tabs={ [
        {
          name: 'desktop',
          title: <Icon icon="desktop" />,
          className: '',
        },
        {
          name: 'tablet',
          title: <Icon icon="tablet" />,
          className: '',
        },
        {
          name: 'mobile',
          title: <Icon icon="smartphone" />,
          className: '',
        },
      ] }
    >
      { ( tab ) => {
        return (
          <>
            <DeviceTabContext.Provider value={ tab }>
              { typeof children === 'function' ? children( tab ) : children }
            </DeviceTabContext.Provider>
          </>
        );
      } }
    </TabPanel>

  );
}

export function useDeviceTab() {
  const context = useContext( DeviceTabContext );
  return context;
}
