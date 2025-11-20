// @flow

const t = require('../src/index.js');

const { objectOf, string, number, maybe, boolean, arrayOf, literalOf, type } = t;
const { tupleOf, tupleOf2, tupleOf3, tupleOf4, tupleOf5, tupleOf6 } = t;
const { unionOf, unionOf2, unionOf3, unionOf4, unionOf5, unionOf6 } = t;

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
const u3 = unionOf3(string, number, boolean)('');
const u4 = unionOf4(string, number, boolean, arrayOf(string))('');
const u5 = unionOf5(string, number, boolean, arrayOf(string), arrayOf(number))('');
const u6 = unionOf6(string, number, boolean, arrayOf(string), arrayOf(number), arrayOf(boolean))('');

/*:: (u2: string | number); */
/*:: (u3: string | number | boolean); */
/*:: (u4: string | number | boolean | string[]); */
/*:: (u5: string | number | boolean | string[] | number[]); */
/*:: (u6: string | number | boolean | string[] | number[] | boolean[]); */

const u2t = unionOf2(tupleOf(string, string), tupleOf(number, number))([0, 0]);

/*:: (u2t : [string, string] | [number, number]); */

const t2 = tupleOf2(number, string)(['1', '1']);
const t3 = tupleOf3(number, number, number)(['0', '1', '1']);
const t4 = tupleOf4(number, string, string, string)(['0', '0', '1']);
const t5 = tupleOf5(string, number, number, number, number)(['0', '1', '1', '0', '0']);
const t6 = tupleOf6(string, number, number, number, number, boolean)(['1', '1', '1', '0', '0', '0']);

/*:: (t2 : [number, string]); */
/*:: (t3: [number, number, number]); */
/*:: (t4: [number, string, string, string]); */
/*:: (t5: [string, number, number, number, number]); */
/*:: (t6: [string, number, number, number, number, boolean]); */


