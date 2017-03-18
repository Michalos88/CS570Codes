/**
 * Created by mlyskawi on 3/18/2017.
 */

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


    public peek(): T {
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

