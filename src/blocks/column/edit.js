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

import Inspector from './inspector';

const { useState, useEffect } = wp.element;


export default function ColumnEdit(props) {
  const { setAttributes, attributes } = props;

  const {
    columns,
    align,
    topPaddingD,
    rightPaddingD,
    bottomPaddingD,
    leftPaddingD,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    currentTab
  } = attributes;
  const onTabSelect = tabName => {
    setAttributes({ currentTab: tabName });
  };
  const deskControls = (
    <>
      <Inspector {...props} />
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
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`
        }}
      >
        <InnerBlocks />
      </div>
    </>
  );
}
