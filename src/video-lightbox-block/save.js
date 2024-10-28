/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	BlockIcon,
	MediaPlaceholder,
} from "@wordpress/block-editor";

const { useState, Component, Fragment, useEffect } = wp.element;
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
import "./style.scss";

import defaultImage from "./images/posterimage-placeholder.png";

export default function save({ attributes }) {
	const {
		altText,
		autoplay,
		height,
		loop,
		manualUrl,
		mediaSrc,
		posterImage,
		posterSrc,
		width,
	} = attributes;
	console.log(attributes);

	const hasPosterImages = posterSrc.length > 0;
	const hasMediaSrc = mediaSrc.length > 0;

	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			{hasMediaSrc && (
				<>
					<a className="glightbox" href={mediaSrc} data-glightbox="video">
						{(hasPosterImages || defaultImage) && (
							<figure className="videolightbox-inner-container">
								<img
									className="poster-image"
									src={posterSrc || defaultImage}
									alt={attributes.altText}
									style={{
										maxWidth: "100%",
										height: "100%",
										display: "block",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</figure>
						)}
						{
							<svg
								version="1.1"
								viewBox="0 0 68 48"
								width="68px"
								className="video-svg-btn"
							>
								<path
									d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
									fill="transparent"
								></path>
								<path d="M 45,24 27,14 27,34" fill="red"></path>
							</svg>
						}
					</a>
				</>
			)}
		</div>
	);
}
