import "./style.editor.scss";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
const { RichText } = wp.blockEditor;
import "./parent";
import edit from "./edit";
import { Dashicon } from "@wordpress/components";

const attributes = {
  title: {
    type: "string",
    source: "html",
    selector: "h4"
  },
  info: {
    type: "string",
    source: "html",
    selector: "p"
  },
  id: {
    type: "number"
  },
  alt: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "alt",
    default: ""
  },
  url: {
    type: "string",
    source: "attribute",
    selector: "img",
    attribute: "src"
  },
  social: {
    type: "array",
    default: [
      { link: "https://facebook.com", icon: "facebook" },
      { link: "https://twitter.com", icon: "twitter" }
    ],
    source: "query",
    selector: ".wp-block-kili-blocks-team-member__social ul li",
    query: {
      icon: {
        source: "attribute",
        attribute: "data-icon"
      },
      link: {
        source: "attribute",
        selector: "a",
        attribute: "href"
      }
    }
  }
};

registerBlockType("kili-blocks/team-member", {
  title: __("Team Member", "kili-core"),
  description: __("Our block for Team member", "kili-core"),
  category: "kili-blocks",
  icon: "admin-users",
  parent: ["kili-blocks/team-members"],
  supports: {
    html: false,
    reusable: false
  },
  attributes,
  keywords: [__("Team", "kili-core"), __("Member", "kili-core")],
  edit,
  save: ({ attributes }) => {
    const { title, info, url, alt, id, social } = attributes;
    return (
      <div>
        {url && (
          <img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />
        )}
        {title && (
          <RichText.Content
            className="wp-block-kili-blocks-team-member__title"
            value={title}
            tagName={"h4"}
          />
        )}
        {info && (
          <RichText.Content
            className="wp-block-kili-blocks-team-member__info"
            value={info}
            tagName={"p"}
          />
        )}
        {social.length > 0 && (
          <div className="wp-block-kili-blocks-team-member__social">
            <ul>
              {social.map((item, index) => {
                return (
                  <li key={index} data-icon={item.icon}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Dashicon icon={item.icon} size={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
});
