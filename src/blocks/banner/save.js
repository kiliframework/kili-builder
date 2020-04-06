export default function BannerSave( { attributes } ) {
  const { url, id, alt } = attributes;
  return (
    <img src={ url } className="main-banner__image" alt={ alt } data-id={ id } />
  );
}
