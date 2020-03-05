/**
 * Set the attributes for the Dimension Control
 *
 * @type {Object}
 */
const DimensionsAttributes = {
	padding: {
		type: 'object',
		default: {
			mobile: {
				prefix: 'sm',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
			tablet: {
				prefix: 'md',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
			desktop: {
				prefix: 'lg',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
		}
	},
	margin: {
		type: 'object',
		default: {
			mobile: {
				prefix: 'sm',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
			tablet: {
				prefix: 'md',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
			desktop: {
				prefix: 'lg',
				directions: {
					top: undefined,
					bottom: undefined,
					right: undefined,
					left: undefined,
				}
			},
		}
	},
	marginSize: {
		type: 'string',
		default: 'no',
	},
	hasMarginControl: {
		type: 'boolean',
		default: true,
	},
	hasAlignmentControls: {
		type: 'boolean',
		default: true,
	},
	hasStackedControl: {
		type: 'boolean',
		default: true,
	},
};

export default DimensionsAttributes;
