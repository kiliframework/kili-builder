import {
  InspectorControls,
} from '@wordpress/block-editor';
import ButtonInspector from '../../components/ButtonInspector';

export default function ButtonBlockInspector( props ) {
  return (
    <InspectorControls>
      <ButtonInspector { ...props } />
    </InspectorControls>
  );
}
