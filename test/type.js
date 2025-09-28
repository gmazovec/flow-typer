// @flow

const { objectOf, string, number, maybe, boolean, unionOf, arrayOf, tupleOf, literalOf } = require('./src/index.js');

/*:: import type { $Literal } from './src/index.js'; */

const male = (literalOf('male')/*: $Literal<"male"> */);
const female = (literalOf('female')/*: $Literal<"female"> */);

const personSchema = objectOf({
	name: string,
	age: maybe(number),
	active: boolean,
	gender: unionOf(male, female),
	tags: arrayOf(string),
	location: tupleOf(number, number)
});

const value = {
	name: "Bob",
	age: 26,
	active: true,
	gender: "male",
	tags: ["friend"],
	location: [42.746635, -75.770045]
};

const v = personSchema(JSON.parse(JSON.stringify(value)));

/*::

(v: {
	name: string,
	age: ?number,
	active: boolean,
	gender: "male" | "female",
	tags: Array<string>,
	location: [number, number]
});

*/
