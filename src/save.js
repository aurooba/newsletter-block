/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { submitText, showName, nameText, emailText } = attributes;

	const Name = () => {
		if (showName) {
			return (
				<p>
					<label for="name">{nameText}</label>
					<input type="text" name="name" placeholder={nameText} />
				</p>
			);
		}
		return null;
	};
	const Email = () => {
		return (
			<p>
				<label for="email">{emailText}</label>
				<input type="text" name="email" placeholder={emailText}></input>
			</p>
		);
	};
	const SubmitButton = () => {
		return <input type="submit" class="submit" value={submitText} />;
	};
	return (
		<Fragment>
			<form {...useBlockProps.save()}>
				<Name></Name>
				<Email></Email>
				<SubmitButton></SubmitButton>
			</form>
			<div className="confirmation-message">
				<InnerBlocks.Content />
			</div>
		</Fragment>
	);
}
