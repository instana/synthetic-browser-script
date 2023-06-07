const assert = require("assert").strict;
let { testBing } = require("./lib/myscript.js");

console.log("pop:", $synthetic.pop);
console.log("description:", $synthetic.description);
console.log("timezone:", $synthetic.timeZone);
console.log("labels:", $synthetic.labels);
console.log("Start to test");
assert.equal($secure.username, 'user1');
testBing();
