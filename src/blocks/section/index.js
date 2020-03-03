import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import edit from "./edit";
import "./parent";
import { InnerBlocks } from "@wordpress/block-editor";
import "./style.editor.scss";

const attributes = {
  columns: {
    type: "number",
    default: 1
  },
  isCreated: {
    type: "boolean",
    default: false
  },
  currentTab: {
    type: "string",
    default: "desk"
  }
};

registerBlockType("kili-blocks/row-section", {
  title: __("kili-Columns", "kili-bloks"),
  parent: ["kili-blocks/k-section"],
  category: "kili-blocks",
  icon: "grid-view",
  supports: {
    html: false,
    reusable: false
  },
  attributes,
  keywords: [__("Row", "kili-blocks"), __("Kili", "kili-blocks")],
  edit,
  save: ({ attributes }) => {
    return (
      <div className={`flexgrid`}>
        <InnerBlocks.Content />
      </div>
    );
  }
});
