/**
 * Created by Michalos on 3/18/2017.
 */


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


RUN();

function RUN(){
    let r1 = rl.createInterface(process.stdin, process.stdout);
    r1.question("Please input the equation without spaces or quit (q): ", input1 => {
        if(input1 != "q"){
            let converting = ConvertInToPo(input1);
            console.log("Converting to Postfix format...\n");
            let result = "";
            let toeval = new Queue<string>();
            while(converting.length != 0){
                result+=converting.peek;
                toeval.enqueue(converting.peek);
                converting.dequeue();

            }
            console.log("Postfix Expression: ",result,"\n");
            console.log("Evaluating Expression... \n");
            console.log("Result: ", Solve(toeval),"\n");

            r1.close();
            return RUN();
        }
        else {
            r1.close();
        }
    });

}


// let exprS = "20-30";
// let exprN = 20-30;
// console.log(exprN);
// let converted = ConvertInToPo(exprS);
//
// console.log(converted);
// console.log("Solved =  ",Solve(converted));

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
        return 2;
    }
}

function Solve(Q){
    let Eval = new Stack<number>();

    while(Q.length != 0){

        let t = Q.peek;
        Q.dequeue();
        if(isNaN(Number(t)) == false && t != " "){
            if (isNaN(Number(Q.peek)) == false && Q.peek != " "){
                let string ="";
                string+=t;
                while((isNaN(Number(Q.peek)) == false && Q.peek != " ")){
                    string+=Q.peek;
                    Q.dequeue();
                }
                Eval.push(Number(string));
            }
            else {
                Eval.push(Number(t));
            }


        }
        else if (t == " "){
            if (isNaN(Number(Q.peek)) == false){
                let string = "";
                while (isNaN(Number(Q.peek)) == false && Q.peek != " "){
                    string+=Q.peek;
                    Q.dequeue();
                }
                Eval.push(Number(string));
            }
            else{
                //skip
            }
        }
        else {
            let TopNum = Eval.peek;
            Eval.pop();
            let nextNum = Eval.peek;
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
            // console.log("t=",t);
        }
        // console.log(Eval);
    }
    return Eval.peek
}





