import { blockCTATransitions, createConfig } from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			add: [blockCTATransitions],
		},
	},
});
