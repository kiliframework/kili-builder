import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";
const { InnerBlocks, InspectorControls } = wp.blockEditor;

const attributes = {
  columns: {
    type: "number",
    default: 2
  }
};

registerBlockType("kili-blocks/team-members", {
  title: __("Team Members", "kili-core"),
  description: __("Our block for wrap other components", "kili-core"),
  icon: "grid-view",
  category: "layout",
  keywords: [__("kili3", "kili-core")],
  supports: {
    html: false,
    align: true,
    align: ["left", "right", "center", "full", "wide"]
  },
  attributes,
  edit({ className, attributes, setAttributes }) {
    const { columns } = attributes;
    return (
      <div className={`${className} has-${columns}-columns`}>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              label={__("Columns", "kili-core")}
              value={columns}
              onChange={columns => setAttributes({ columns })}
              min={1}
              max={12}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          allowedBlocks={["kili-blocks/team-member"]}
          template={[["kili-blocks/team-member"], ["kili-blocks/team-member"]]}
        />
      </div>
    );
  },
  save({ attributes }) {
    const { columns } = attributes;
    return (
      <div className={`has-${columns}-columns`}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
