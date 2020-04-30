import { RichText } from '@wordpress/block-editor';

const CarouselQuotesView = ( { image } ) => (
  <a href="#as">
    <div className="review flexgrid flexgrid--flex-column">
      <div className="review__avatar">
        <img
          className="avatar"
          src={ image.url }
          alt={ image.alt }
          data-id={ image.id }
          tabIndex="0"
        />
      </div>
      <div className="review__quote">
        <RichText.Content
          tagName="blockquote"
          value={ image.caption }
        />
      </div>
      <div className="review__signature">
        <RichText.Content
          tagName="span"
          className="review__signature-author"
          value={ image.author }
        />
        <RichText.Content
          className="review__signature-title"
          tagName="span"
          value={ image.title }
        />
      </div>
    </div>
  </a>
);

export default CarouselQuotesView;
