import { RichText } from '@wordpress/block-editor';

const CarouselImagesView = ( { image } ) => {
  return (
    <div className="industries-carousel__item">
      <img
        className="icon"
        src={ image.url }
        alt={ image.alt }
        data-id={ image.id }
        tabIndex="0"
      />
      { image.caption && <RichText.Content
        tagName="p"
        className="item-title"
        value={ image.caption }
      /> }
    </div>
  );
};

export default CarouselImagesView;
