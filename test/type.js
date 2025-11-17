// @flow

const t = require('../src/index.js');

const { objectOf, string, number, maybe, boolean, arrayOf, literalOf, type } = t;
const { tupleOf, tupleOf2 } = t;
const { unionOf, unionOf2 } = t;

/*:: import type { $Literal } from '../src/index.js'; */

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

class Time {}

const timeType = type((v /*: mixed */) => {
	if (v instanceof Time) {
		return v;
	}
	throw new TypeError();
});

const v2 = timeType(eval('new Time();'));

/*::

// $FlowExpectedError[incompatible-cast]
(v2: Date);
(v2: Time);

*/

const u2 = unionOf2(string, number)('');

/*::

(u2: string | number);

*/

const u2t = unionOf2(tupleOf(string, string), tupleOf(number, number))([0, 0]);

/*::

(u2t : [string, string] | [number, number]);

*/

const t2 = tupleOf2(number, string)(['1', '1']);

/*::

(t2 : [number, string]);

*/

