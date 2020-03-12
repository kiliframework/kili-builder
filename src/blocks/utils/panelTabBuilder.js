import { Icon } from '@wordpress/components';
import { DEVICE_GROUP } from '../../constants/devicesSizes';

export const panelTabBuiler = DEVICE_GROUP.map( ( device ) => ( {
  name: device,
  title: <Icon icon={ device } />,
  className: '',
} ) );
