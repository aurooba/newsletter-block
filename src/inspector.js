import { Component } from "@wordpress/element";
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { withState } from "@wordpress/compose";

export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const { list, showName, setAttributes, tag, confirmationText } = this.props;

		const FormsOptions = [{ label: "Choose Form", value: false }];
		Object.keys(auroobamakes_newsletter_block_vars.convertkit_forms).map(
			(key) =>
				FormsOptions.push({
					label: auroobamakes_newsletter_block_vars.convertkit_forms[key],
					value: key,
				})
		);
		const FormsControl = withState({
			list,
		})(({ form, setState }) => (
			<SelectControl
				label="Form"
				value={list}
				options={FormsOptions}
				onChange={(list) => {
					console.log(list);
					setState({ list });
					setAttributes({ list: list });
				}}
			/>
		));

		const TagOptions = [{ label: "Choose Tag", value: false }];
		Object.keys(auroobamakes_newsletter_block_vars.convertkit_tags).map((key) =>
			TagOptions.push({
				label: auroobamakes_newsletter_block_vars.convertkit_tags[key],
				value: key,
			})
		);
		const TagsControl = withState({
			tag,
		})(({ tag, setState }) => (
			<SelectControl
				label="Tags"
				value={tag}
				options={TagOptions}
				onChange={(tag) => {
					setState({ tag });
					setAttributes({ tag: tag });
				}}
			/>
		));
		const ShowName = withState({
			showName,
		})(({ showName, setState }) => (
			<ToggleControl
				label="Name field"
				help={showName ? "Include name field." : "No name field."}
				checked={showName}
				onChange={(showName) => {
					setState((state) => ({
						showName: !state.showName,
					}));
					setAttributes({ showName: showName });
					console.log(showName);
				}}
			/>
		));

		// const Confirmation = (
		// 	<RichText
		// 		tagName="span"
		// 		value={confirmationText}
		// 		onChange={(value) => setAttributes({ confirmationText: value })}
		// 	/>
		// );
		return (
			<InspectorControls>
				<PanelBody
					title={__("Form Settings", "newsletter-block")}
					// initialOpen={attributes.mailingList ? false : true}
				>
					<FormsControl></FormsControl>
					<TagsControl></TagsControl>
					<ShowName></ShowName>
					{/* {Confirmation} */}
				</PanelBody>
			</InspectorControls>
		);
	}
}
