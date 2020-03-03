import { Component } from "@wordpress/element";
import {
  RangeControl,
  PanelBody,
  TabPanel,
  PanelRow
} from "@wordpress/components";
import { Icon } from "@wordpress/components";
import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

class ColumnEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const {
      columns,
      align,
      topPaddingD,
      rightPaddingD,
      bottomPaddingD,
      leftPaddingD,
      currentTab
    } = attributes;
    const onTabSelect = tabName => {
      setAttributes({ currentTab: tabName });
    };
    const deskControls = (
      <>
        <PanelBody
          title={__("Row Settings", "kili-blocks")}
          initialOpen={false}
        >
          <PanelRow>
            <h2>Columns Size: {columns}</h2>
          </PanelRow>
        </PanelBody>
        <PanelBody title={__("Setting Margin Column")} initialOpen={false}>
          <h2>{__("Desktop Padding (px)")}</h2>
          <RangeControl
            label={<Icon icon="arrow-up" />}
            value={topPaddingD}
            className="kt-icon-rangecontrol kt-top-padding"
            onChange={value => {
              setAttributes({
                topPaddingD: value
              });
            }}
            min={0}
            max={500}
          />
          <RangeControl
            label={<Icon icon="arrow-right" />}
            value={rightPaddingD}
            className="kt-icon-rangecontrol kt-right-padding"
            onChange={value => {
              setAttributes({
                rightPaddingD: value
              });
            }}
            min={0}
            max={500}
          />
          <RangeControl
            label={<Icon icon="arrow-down" />}
            value={bottomPaddingD}
            className="kt-icon-rangecontrol kt-bottom-padding"
            onChange={value => {
              setAttributes({
                bottomPaddingD: value
              });
            }}
            min={0}
            max={500}
          />
          <RangeControl
            label={<Icon icon="arrow-left" />}
            value={leftPaddingD}
            className="kt-icon-rangecontrol kt-left-padding"
            onChange={value => {
              setAttributes({
                leftPaddingD: value
              });
            }}
            min={0}
            max={500}
          />
        </PanelBody>
      </>
    );

    const mobileControls = (
      <PanelBody title={__("Tablet Padding/Margin")} initialOpen={false}>
        <h2>{__("Tablet Padding (px)")}</h2>
        <RangeControl
          label={<Icon icon="arrow-up" />}
          value={topPaddingD}
          className=""
          onChange={value => {
            setAttributes({
              topPaddingD: value
            });
          }}
          min={0}
          max={500}
        />
      </PanelBody>
    );

    const tabletControls = (
      <PanelBody title={__("Mobile Padding/Margin")} initialOpen={false}>
        <h2>{__("Mobile Padding (px)")}</h2>
        <RangeControl
          label={<Icon icon="arrow-up" />}
          value={topPaddingD}
          className=""
          onChange={value => {
            setAttributes({
              topPaddingD: value
            });
          }}
          min={0}
          max={500}
        />
      </PanelBody>
    );
    return (
      <>
        <InspectorControls>
          <TabPanel
            className="kt-inspect-tabs"
            activeClass="active-tab"
            initialTabName={currentTab}
            onSelect={onTabSelect}
            tabs={[
              {
                name: "desk",
                title: <Icon icon="desktop" />,
                className: ""
              },
              {
                name: "tablet",
                title: <Icon icon="tablet" />,
                className: ""
              },
              {
                name: "mobile",
                title: <Icon icon="smartphone" />,
                className: ""
              }
            ]}
          >
            {tab => {
              let tabout;
              if (tab.name) {
                if ("mobile" === tab.name) {
                  tabout = mobileControls;
                } else if ("tablet" === tab.name) {
                  tabout = tabletControls;
                } else {
                  tabout = deskControls;
                }
              }
              return <div>{tabout}</div>;
            }}
          </TabPanel>
        </InspectorControls>

        <div
          id="column create"
          style={{
            paddingTop: `${topPaddingD}px`,
            paddingBottom: `${bottomPaddingD}px`,
            paddingLeft: `${leftPaddingD}px`,
            paddingRight: `${rightPaddingD}px`
          }}
        >
          <InnerBlocks />
        </div>
      </>
    );
  }
}

export default ColumnEdit;
