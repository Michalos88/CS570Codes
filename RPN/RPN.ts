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

    public get end():T {
        return this.arr[this.arr.length-1];
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

    public get peek(): T {return this.arr[this.arr.length - 1];}

    public get length() {return this.arr.length;}

    public clean() {this.arr = [];}

}


// ask();
//
// function ask(){
//     let r1 = rl.createInterface(process.stdin, process.stdout);
//     r1.question("Please input the equation without spaces or quit (q):\n", input1 => {
//         if(input1 != "q"){
//             let converting = ConvertInToPo(input1);
//             console.log("Converting to Postfix format...\n");
//             console.log("Postfix Expression: ",converting,"\n");
//             console.log("Evaluating Expression... \n");
//             console.log("Result: ", Solve(converting),"\n");
//             return ask();
//         }
//         else if (input1 == "q"){
//             r1.close();
//         }
//     });
//
// }


let exprS = "(2+(34+3))";
let exprN = (2+(34+3));
console.log(exprN);
let converted = ConvertInToPo(exprS);

console.log(converted);

function ConvertInToPo(expr){
    let opStack = new Stack<string>();
    let infixQ = new Queue<string>();
    let postQ = new Queue<string>();
    let exprSplited = expr.split("");
    for (let i = 0;i < exprSplited.length; i++){
        infixQ.enqueue(exprSplited[i]);
    }


    while (infixQ.length != 0){
        let t = infixQ.peek; infixQ.dequeue();
        if(isNaN(Number(t)) == false){
            if (isNaN(Number(infixQ.peek)) && infixQ.peek != "(" && infixQ.peek != ")" && infixQ.peek != null){
                postQ.enqueue(t);
                postQ.enqueue(" ");
            }
            else {
                postQ.enqueue(t);
            }

        }
        else if (opStack.length == 0){
            opStack.push(t);
        }
        else if (t == "("){
            opStack.push(t);
        }
        else if (t == ")" ){
            while (opStack.peek != "("){
                postQ.enqueue(opStack.peek);
                opStack.pop();
            }
            opStack.pop();
        }
        else{
            while (opStack.length != 0 && opStack.peek !="("
                && Precedence(t) <= Precedence(opStack.peek) ){
                postQ.enqueue(opStack.peek);
                opStack.pop();
            }
        opStack.push(t);
        }
    }
    while (opStack.length != 0){
        postQ.enqueue(opStack.peek);
        opStack.pop();
    }


    return postQ;

}

function Precedence(operator){
    if(operator == "+" || operator == "-"){
        return 0;
    }
    if(operator == "*" || operator == "/" || operator == "%"){
        return 1;
    }
    if(operator == "^"){
        //TODO: Have to change ^ to POW
        return 2;
    }
}

function Solve(Q){
    let Eval = new Stack<number>();

    while(Q.length != 0){
        let t = Q.peek;
        Q.dequeue();
        if(isNaN(Number(t)) == false && t != " "){
           Eval.push(t);
        }
        else if (t == " "){
            let string = "";
            while (isNaN(Number(Q.peek)) == false && Q.peek != " "){
                string+=Q.peek;
                Q.dequeue();
                console.log(string);
            }
            Eval.push(Number(string));


        }
        else {
            let TopNum = Number(Eval.peek);
            Eval.pop();
            let nextNum = Number(Eval.peek);
            Eval.pop();
            let answ;
            switch (t) {
                case "+": answ = nextNum + TopNum; break;
                case "-": answ = nextNum - TopNum; break;
                case "*": answ = nextNum * TopNum; break;
                case "/": answ = nextNum / TopNum; break;
                case "^": answ = Math.pow(nextNum,TopNum); break;
                case "%": answ = nextNum % TopNum; break;


            }
            Eval.push(answ);
        }

    }
    return Eval.peek
}

console.log("Solved =  ",Solve(converted));






