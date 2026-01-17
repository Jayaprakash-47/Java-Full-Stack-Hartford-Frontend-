/**
 * 1. BASIC TYPES & INFERENCE
 * TypeScript can often "guess" the type (inference),
 * but explicit typing is safer.
 */
var isDone = false;
var total = 100;
var userName = "Alex";
var notDefined = undefined;
var notPresent = null;
/**
 * 2. ARRAYS & TUPLES
 */
// Array of a single type
var numbers = [1, 2, 3];
var fruits = ["Apple", "Banana"]; // Generic syntax
// Tuples: Fixed length and fixed types in specific order
var connection = [200, "Success"];
/**
 * 3. UNION & LITERAL TYPES
 * Use Union (|) to allow more than one type.
 * Use Literal types to restrict a variable to specific values.
 */
var appStatus = "active";
appStatus = 0;
var direction;
direction = "North"; // Valid
var manager = {
    id: 1,
    name: "Sarah",
    email: "sarah@company.com"
};
/**
 * 5. FUNCTIONS: PARAMETERS & RETURNS
 * You should type the inputs and the output.
 */
function add(x, y) {
    return x + y;
}
// Arrow function version
var multiply = function (a, b) { return a * b; };
// Void for functions that don't return anything
function logMessage(msg) {
    console.log(msg);
}
/**
 * 6. ENUMS
 * A way to give friendly names to sets of numeric/string values.
 */
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
    Role["Guest"] = "GUEST";
})(Role || (Role = {}));
var currentRole = Role.Admin;
/**
 * 7. TYPE ASSERTIONS (Casting)
 * Telling the compiler "I know what I'm doing, treat this as this type."
 */
var someValue = "This is a string";
var strLength = someValue.length;
/**
 * 8. GENERICS
 * Creating reusable components that work with a variety of types.
 */
function getArray(items) {
    return new Array().concat(items);
}
var numArr = getArray([1, 2, 3]);
var strArr = getArray(["A", "B", "C"]);
/**
 * 9. CLASSES
 * Supports Access Modifiers: public, private, and protected.
 */
var Animal = /** @class */ (function () {
    function Animal(species) {
        this.species = species;
    }
    Animal.prototype.makeSound = function () {
        console.log("".concat(this.species, " makes a sound."));
    };
    return Animal;
}());
