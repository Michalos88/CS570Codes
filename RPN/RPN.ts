/**
 * Created by mlyskawi on 3/18/2017.
 */
// Implement the RPN calculator pseudo-code supplied in the lecture as real code. Your program must:
//
//     Prompt the user for an infix math problem.
//     Convert the problem to postfix.
//     Output the problem in postfix.
//     Calculate the result.
//     Display the result.
//     Ask the user for another math problem.
//     If the user enters quit for the problem, end the program.
//
//     Use the standard stack and queue class/methodology provided by your preferred language's framework, such as the STL stack/queue classes in C++ or the Array class in JavaScript. Put the conversion procedure in its own function. Put the calculate result procedure in its own function as well.
//
//     You need to handle multi-digit numbers even though the sample code does not. In your version, numbers (operands) are separated from operators by zero or more spaces, while numbers are separated from other numbers by one or more spaces. While negative numbers cannot be input by the user, the result may be negative based on the input math problem.
//
//     You must support +, -, *, /, and % operators, as well as (potentially nested) parenthesis. For +10 extra credit, also support raising a number to a power with the POW operator, which must appear as those three letters in all uppercase.
//

import * as rl from 'readline';


class Queue<T>{

    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }

    public enqueue(value: T) {
        this.arr.push(value);
    }

    public dequeue(): T {
        return this.arr.shift();
    }


    public get peek(): T {
        return this.arr[0];
    }


    public get length() {return this.arr.length;}

    public clean() {this.arr = [];}
}

class Stack<T>{

    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }


    public push(value: T) {
        this.arr.push(value);
    }

    public pop(): T {return this.arr.pop();}

    public peek(): T {return this.arr[this.arr.length - 1];}

    public get length() {return this.arr.length;}

    public clean() {this.arr = [];}

}

// let r1 = rl.createInterface(process.stdin, process.stdout);

let exprN = 23+3;
let exprS = "23+3";
console.log(ConvertInToPo(exprS));
function ConvertInToPo(expr){
    let opStack = new Stack<string>();
    let infixQ = new Queue<string>();
    let postQ = new Queue<string>();
    let exprSplited = expr.split("");
    for (let i = 0;i < exprSplited.length; i++){
        infixQ.enqueue(exprSplited[i]);
    }
    let t = infixQ.peek;
    infixQ.dequeue();

    return t;
    // while (infixQ.length != 0){
    //
    // }




}




// let Eval = new Stack<number>();
// let postQ = new Queue<string>();
//
// while(postQ.length>0){
//     let t = postQ.F
//     postQ.dequeue();
//     if()
// }







