import { registerBlockType } from "@wordpress/blocks";
import BackgroundAttributes from '../../components/Background/BackgroundAttributes';
import DimensionAttributes from '../../components/DimensionsControl/attributes';
import { InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import edit from "./edit";

registerBlockType("kili/k-column", {
  title: __("Kili-Column", "kili-builder"),
  parent: ["kili/k-section"],
  category: "kili-builder",
  attributes: {
    columns: {
      type: "string",
      default: ""
    },
    align: {
      type: "string",
      default: ""
    },
    topPaddingD: {
      type: "number",
      default: 0
    },
    leftPaddingD: {
      type: "number",
      default: 0
    },
    rightPaddingD: {
      type: "number",
      default: 0
    },
    bottomPaddingD: {
      type: "number",
      default: 0
    },
    topPaddingT: {
      type: "number",
      default: 0
    },
    leftPaddingT: {
      type: "number",
      default: 0
    },
    rightPaddingT: {
      type: "number",
      default: 0
    },
    bottomPaddingT: {
      type: "number",
      default: 0
    },
    topPaddingM: {
      type: "number",
      default: 0
    },
    leftPaddingM: {
      type: "number",
      default: 0
    },
    rightPaddingM: {
      type: "number",
      default: 0
    },
    bottomPaddingM: {
      type: "number",
      default: 0
    },
    width: {
			type: "string"
		},
		contentAlign: {
			type: "string"
		},
		textColor: {
			type: "string"
		},
		customTextColor: {
			type: "string"
    },
    ...BackgroundAttributes,
    ...DimensionAttributes,
  },
  supports: {
    align: true,
    align: ["left", "center", "right"]
  },
  icon: "columns",
  keywords: [__("Column", "kili-builder"), __("Kili", "kili-builder")],
  edit,
  save: ({ attributes }) => {
    const { columns } = attributes;
    const createClass = att => {
      const {
        align,
        topPaddingD,
        bottomPaddingD,
        rightPaddingD,
        leftPaddingD
      } = att;
      let classes = "";

      if (topPaddingD) {
        classes += `padding-top__${topPaddingD} `;
      }
      if (bottomPaddingD) {
        classes += `padding-bottom__${bottomPaddingD} `;
      }
      if (leftPaddingD) {
        classes += `padding-left__${leftPaddingD} `;
      }
      if (rightPaddingD) {
        classes += `padding-right__${rightPaddingD} `;
      }
      switch (align) {
        case "left":
          classes += "justify-content--left ";
          break;
        case "center":
          classes += "justify-content--center ";
          break;
        case "right":
          classes += "justify-content--right ";
          break;
        default:
          "";
          break;
      }

      return classes;
    };

    const createBasis = col => {
      let value = "";
      if (col) {
        const fbasis = (Number(col) / 12) * 100;
        value += `flex-basis__${fbasis} `;
      }
      return value;
    };

    const className = createClass(attributes);
    const basis = createBasis(columns);
    return (
      <div className={`flexgrid__item ${basis}`}>
        <div className={`kili-column-inner ${className}`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  }
});
