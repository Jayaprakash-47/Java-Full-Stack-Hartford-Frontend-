//function declaration without parameters
function sayHello(){
    console.log("Hello, World!");
}
//function declaration with parameters
function sayHello(name){
    console.log("Hello, " + name + "!");
}
sayHello("JP"); // Outputs: Hello, JP!


//function expression
const add = function(a, b){
    return a + b;
};
console.log(add(5, 3)); // Outputs: 8


//arrow function   
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(4, 6)); // Outputs: 24

//arrow function with implicit return
const square = x => x * x;
console.log(square(5)); // Outputs: 25

//function expression without parameters
const greet= function(){
    console.log("Greetings!");
}

greet(); // Outputs: Greetings!

//function expression with parameters
const sayHelloTo = function(name){
    console.log("Hello, " + name + "!");
};
sayHelloTo("JP"); // Outputs: Hello, JP!


//arrow function without parameters
const welcome = () => {
    console.log("Welcome!");
};
welcome(); // Outputs: Welcome!



