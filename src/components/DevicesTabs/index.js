import { TabPanel, Icon } from '@wordpress/components';

export default function DevicesTabs({ currentTab, onTabSelect }, ) {
  return (
    <TabPanel
      className="kt-inspect-tabs"
      activeClass="active-tab"
      initialTabName={ currentTab }
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
          </>
        );
      } }
    </TabPanel>
  );
}
