/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

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
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	BlockControls,
	MediaReplaceFlow,
	Disabled,
} from "@wordpress/block-editor";

import defaultImage from "./images/posterimage-placeholder.png";

import {
	ToolbarButton,
	ToolbarGroup,
	ToggleControl,
	PanelBody,
	Button,
	ResponsiveWrapper,
	Spinner,
} from "@wordpress/components";

const { useState, Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		bgImageId,
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
	const hasPosterImages = posterSrc.length > 0;
	const hasMediaSrc = mediaSrc.length > 0;

	const instructions = (
		<p>
			{__(
				"To edit the background image, you need permission to upload media.",
				"image-selector-example",
			)}
		</p>
	);
	const onUpdateImage = (image) => {
		setAttributes({
			bgImageId: image.id,
			posterSrc: image.url,
			posterImage: image,
		});
	};
	const onRemoveImage = () => {
		setAttributes({
			bgImageId: undefined,
			posterSrc: undefined,
		});
	};
	const ALLOWED_MEDIA_TYPES = ["image"];
	return (
		<>
			<div {...useBlockProps()}>
				<BlockControls>
					<ToolbarGroup>
						<MediaReplaceFlow
							mediaURL={mediaSrc}
							onSelect={(media) =>
								setAttributes({ mediaId: media.id, mediaSrc: media.url })
							}
							onSelectURL={(url) => setAttributes({ mediaSrc: url })}
						/>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title={__("Background settings", "image-selector-example")}
						initialOpen
					>
						<div className="wp-block-image-selector-example-image">
							{!posterSrc && (
								<MediaUploadCheck fallback={instructions}>
									<MediaUpload
										title={__("Background image", "image-selector-example")}
										onSelect={onUpdateImage}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={posterSrc}
										render={({ open }) => (
											<Button
												className={
													!bgImageId
														? "editor-post-featured-image__toggle"
														: "editor-post-featured-image__preview"
												}
												onClick={open}
											>
												{!bgImageId &&
													__("Set background image", "image-selector-example")}
												{!!bgImageId && !posterSrc && <Spinner />}
												{bgImageId && posterSrc && (
													<ResponsiveWrapper
													// naturalWidth={ getMedia( bgImageId ).media_details.width }
													// naturalHeight={ getMedia( bgImageId ).media_details.height }
													>
														<img
															src={posterSrc}
															alt={__(
																"Background image",
																"image-selector-example",
															)}
														/>
													</ResponsiveWrapper>
												)}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							)}
							{!!posterSrc && (
								<MediaUploadCheck>
									<MediaUpload
										title={__("Background image", "image-selector-example")}
										onSelect={onUpdateImage}
										allowedTypes={ALLOWED_MEDIA_TYPES}
										value={bgImageId}
										mediaPreview={
											<Disabled>
												<img src={posterSrc} alt="Image" />
											</Disabled>
										}
										render={({ open }) => (
											<>
												{posterSrc && (
													<ResponsiveWrapper
														naturalWidth={200}
														naturalHeight={100}
													>
														<img
															src={posterSrc}
															alt={__(
																"Background image",
																"image-selector-example",
															)}
														/>
													</ResponsiveWrapper>
												)}
												<Button onClick={open} isSecondary isLarge>
													{__(
														"Replace background image",
														"image-selector-example",
													)}
												</Button>
											</>
										)}
									/>
								</MediaUploadCheck>
							)}
						</div>
					</PanelBody>
				</InspectorControls>

				{hasMediaSrc && (
					<>
						<a className="glightbox" data-href={mediaSrc} data-glightbox="video">
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

				{!hasPosterImages && !hasMediaSrc && (
					<MediaPlaceholder
						//multiple
						gallery
						icon={<BlockIcon icon="format-gallery" />}
						labels={{
							title: "Video Source",
							instructions: "Video source upload video, video source URL",
						}}
						onSelect={(media) =>
							setAttributes({
								mediaSrc: media.url,
								altText: media.alt,
								mediaId: media.id,
							})
						}
						onSelectURL={(url) => setAttributes({ mediaSrc: url })}
						onWidthChange={(newWidth) => setAttributes({ width: newWidth })}
						onHeightChange={(newHeight) => setAttributes({ height: newHeight })}
					/>
				)}
			</div>
		</>
	);
}
