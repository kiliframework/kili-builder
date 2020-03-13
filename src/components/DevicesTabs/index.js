import { TabPanel, Icon } from '@wordpress/components';
import './editor.scss';

export default function DevicesTabs( { onTabSelect, children }, ) {
  return (
    <TabPanel
      className="kt-inspect-tabs"
      activeClass="active-tab"
      initialTabName="desktop"
      onSelect={ onTabSelect }
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
            { children( tab ) }
          </>
        );
      } }
    </TabPanel>
  );
}
