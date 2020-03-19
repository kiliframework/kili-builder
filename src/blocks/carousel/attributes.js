export default {
  images: {
    type: "array",
    default: [],
    source: "query",
    selector: '.kili-carousel-slide',
    query: {
      url: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "src"
      },
      link: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "data-link"
      },
      alt: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "alt",
        default: ""
      },
      id: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "data-id"
      },
      caption: {
        type: "string",
        source: "html",
        selector: ".kili-carousel-slide__caption"
      },
      author: {
        type: "string",
        source: "html",
        selector: ".kili-carousel-slide__author"
      },
      title: {
        type: "string",
        source: "html",
        selector: ".kili-carousel-slide__title"
      },
    }
  },
  ids: {
    type: "array",
    items: {
      type: "number"
      },
    default: []
  },
}