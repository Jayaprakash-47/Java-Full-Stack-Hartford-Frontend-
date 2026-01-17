/**
 * 1. BASIC TYPES & INFERENCE
 * TypeScript can often "guess" the type (inference), 
 * but explicit typing is safer.
 */
let isDone: boolean = false;
let total: number = 100;
let userName: string = "Alex";
let notDefined: undefined = undefined;
let notPresent: null = null;

/**
 * 2. ARRAYS & TUPLES
 */
// Array of a single type
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["Apple", "Banana"]; // Generic syntax

// Tuples: Fixed length and fixed types in specific order
let connection: [number, string] = [200, "Success"];

/**
 * 3. UNION & LITERAL TYPES
 * Use Union (|) to allow more than one type.
 * Use Literal types to restrict a variable to specific values.
 */
let appStatus: string | number = "active"; 
appStatus = 0;


let direction: "North" | "South" | "East" | "West";
direction = "North"; // Valid
// direction = "Up";  // Error!

/**
 * 4. INTERFACES & TYPE ALIASES
 * Used to define the shape of objects.
 */


interface Employee {
    readonly id: number;    // Cannot be changed after initialization
    name: string;
    email: string;
    department?: string;    // Optional property (notice the ?)
}

const manager: Employee = {
    id: 1,
    name: "Sarah",
    email: "sarah@company.com"
};

/**
 * 5. FUNCTIONS: PARAMETERS & RETURNS
 * You should type the inputs and the output.
 */
function add(x: number, y: number): number {
    return x + y;
}

// Arrow function version
const multiply = (a: number, b: number): number => a * b;

// Void for functions that don't return anything
function logMessage(msg: string): void {
    console.log(msg);
}

/**
 * 6. ENUMS
 * A way to give friendly names to sets of numeric/string values.
 */
enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}
let currentRole: Role = Role.Admin;

/**
 * 7. TYPE ASSERTIONS (Casting)
 * Telling the compiler "I know what I'm doing, treat this as this type."
 */
let someValue: any = "This is a string";
let strLength: number = (someValue as string).length;

/**
 * 8. GENERICS
 * Creating reusable components that work with a variety of types.
 */
function getArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let numArr = getArray<number>([1, 2, 3]);
let strArr = getArray<string>(["A", "B", "C"]);

/**
 * 9. CLASSES
 * Supports Access Modifiers: public, private, and protected.
 */
class Animal {
    private species: string;

    constructor(species: string) {
        this.species = species;
    }

    public makeSound(): void {
        console.log(`${this.species} makes a sound.`);
    }
}