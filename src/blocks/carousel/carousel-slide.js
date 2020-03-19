/**
 * External dependencies
 */
import classnames from 'classnames';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BACKSPACE, DELETE } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { RichText } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { compose } from '@wordpress/compose';
import { close, chevronLeft, chevronRight } from '@wordpress/icons';

class GalleryImage extends Component {
	constructor() {
		super( ...arguments );
		// The onDeselect prop is used to signal that the GalleryImage component
		// has lost focus. We want to call it when focus has been lost
		// by the figure element or any of its children but only if
		// the element that gained focus isn't any of them.
		//
		// debouncedOnSelect is scheduled every time a figure's children
		// is blurred and cancelled when any is focused. If none gain focus,
		// the call to onDeselect will be executed.
		//
		// onBlur / onFocus events are quick operations (<5ms apart in my testing),
		// so 50ms accounts for 10x lagging while feels responsive to the user.
		this.state = {
			captionSelected: false,
		};
	}
	componentDidUpdate( prevProps ) {
		const {
			isSelected,
			image,
			url,
			__unstableMarkNextChangeAsNotPersistent,
    } = this.props;    
		if ( image && ! url ) {
			__unstableMarkNextChangeAsNotPersistent();
			this.props.setAttributes( {
				url: image.source_url,
				alt: image.alt_text,
			} );
		}

		// unselect the caption so when the user selects other image and comeback
		// the caption is not immediately selected
		if (
			this.state.captionSelected &&
			! isSelected &&
			prevProps.isSelected
		) {
			this.setState( {
				captionSelected: false,
			} );
		}
	}

	render() {
		const {
			url,
			alt,
			id,
			linkTo,
			link,
      caption,
      author,
      title,
			setAttributes,
			'aria-label': ariaLabel,
		} = this.props;

		let href;

		switch ( linkTo ) {
			case 'media':
				href = url;
				break;
			case 'attachment':
				href = link;
				break;
		}

		const img = (
			// Disable reason: Image itself is not meant to be interactive, but should
			// direct image selection and unfocus caption fields.
			/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
			<>
				<img
          className="avatar"
					src={ url }
					alt={ alt }
					data-id={ id }
					tabIndex="0"
					aria-label={ ariaLabel }
					ref={ this.bindContainer }
				/>
				{ isBlobURL( url ) && <Spinner /> }
			</>
			/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
		);
    
    return (<>
      <div className="flexgrid__item xsmall--col-4 small--col-4 medium--col-4">
        <a href="#">
          <div className="review flexgrid flexgrid--flex-column">
            <div className="review__avatar">
              { img }
            </div>
            <div className="review__quote">
              <RichText
                tagName="blockquote"
                placeholder="Insert quote"
                value={ caption }
                onChange={ ( newCaption ) =>
                  setAttributes( { caption: newCaption } )
                }
                inlineToolbar
              />
            </div>
            <div className="review__signature">
            <RichText
                  tagName="span"
                  className="review__signature-author"
                  placeholder="Insert author"
                  value={ author }
                  onChange={ ( newCaption ) =>
                    setAttributes( { author: newCaption } )
                  }
                  inlineToolbar
                />
                <RichText
                  className="review__signature-title"
                  tagName="span"
                  placeholder="Insert title"
                  value={ title }
                  onChange={ ( newCaption ) =>
                    setAttributes( { title: newCaption } )
                  }
                  inlineToolbar
                />
            </div>
          </div>
        </a>
      </div>
    </>)
	}
}

export default compose( [
	withSelect( ( select, ownProps ) => {
		const { getMedia } = select( 'core' );
		const { id } = ownProps;

		return {
			image: id ? getMedia( parseInt( id, 10 ) ) : null,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { __unstableMarkNextChangeAsNotPersistent } = dispatch(
			'core/block-editor'
		);
		return {
			__unstableMarkNextChangeAsNotPersistent,
		};
	} ),
] )( GalleryImage );