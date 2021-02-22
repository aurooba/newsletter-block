/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	BlockControls,
	InnerBlocks,
} from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { useState } from "@wordpress/element";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Internal dependencies
 */
import Inspector from "./inspector";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when 	the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		list,
		showName,
		tag,
		submitText,
		nameText,
		emailText,
		confirmationText,
	} = attributes;
	const [isConfirmation, setisConfirmation] = useState();
	function switchToForm() {
		setisConfirmation(true);
	}

	function switchToConfirmation() {
		setisConfirmation(false);
	}
	const MY_TEMPLATE = [
		["core/paragraph", { placeholder: "Add your confirmation message here" }],
	];

	const Name = (
		<p>
			<RichText
				tagName="label"
				value={nameText}
				onChange={(value) => setAttributes({ nameText: value })}
				withoutInteractiveFormatting
				allowedFormats={[]}
			/>
			<input type="text" name="name" placeholder={nameText} disabled />
		</p>
	);

	const Email = (
		<p>
			<RichText
				tagName="label"
				value={emailText}
				onChange={(value) => setAttributes({ emailText: value })}
				withoutInteractiveFormatting
				allowedFormats={[]}
			/>
			<input type="text" name="email" placeholder={emailText} disabled />
		</p>
	);

	const Submit = (
		<div class="submit">
			<RichText
				value={submitText}
				onChange={(value) => setAttributes({ submitText: value })}
				placeholder={__("Submit")}
				allowedFormats={[]}
			/>
		</div>
	);

	let ConfirmationMessage = (
		// <RichText
		// 	tagName="p"
		// 	value={confirmationText}
		// 	onChange={(value) => setAttributes({ confirmationText: value })}
		// 	withoutInteractiveFormatting
		// 	placeholder="Add your Confirmation text here"
		// />
		<InnerBlocks template={MY_TEMPLATE} />
	);

	return (
		<div {...useBlockProps()}>
			<Inspector
				list={list}
				showName={showName}
				setAttributes={setAttributes}
				tag={tag}
				confirmationText={confirmationText}
			/>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label="Form"
						className="components-tab-button"
						isPressed={!isConfirmation}
						onClick={switchToConfirmation}
					>
						<span>Form</span>
					</ToolbarButton>
					<ToolbarButton
						label="Succss Message"
						className="components-tab-button"
						isPressed={isConfirmation}
						onClick={switchToForm}
					>
						<span>Success Message</span>
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			{!isConfirmation ? (
				<form>
					{showName && Name}
					{Email}
					{Submit}
				</form>
			) : (
				<div className="confirmation-message">{ConfirmationMessage}</div>
			)}
		</div>
	);
}
