import construct = Reflect.construct;
/**
 * Created by mlyskawi on 4/2/2017.
 */

class PriorityQueue<T>{

    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }


    private object: any;


    public enqueue(value: T, priority: T) {

        function  Obejct (element, priority){
            this.priority = priority;
            this.element = element;
        }

        this.object = new Obejct (value,priority);


        if (this.arr.length == 0){
            this.arr.push(null);
            this.arr.push(this.object);
        }
        else{
            this.arr.push(this.object);
            let i = this.arr.length-1;
            let sorting = null;
            while (sorting != 0){
                sorting = 0;
                if (i != 1){
                    if (this.arr[i].priority < this.arr[Math.floor(i/2)].priority){
                        sorting++;
                        let temp = this.arr[Math.floor(i/2)];
                        this.arr[Math.floor(i/2)] = this.arr[i];
                        this.arr[i] = temp;
                        i = Math.floor(i/2);
                    }
                    // if (i != 1){
                    //     if (this.arr[i].priority < this.arr[i-1].priority){
                    //         sorting++;
                    //         let temp = this.arr[i-1];
                    //         this.arr[i-1] = this.arr[i];
                    //         this.arr[i] = temp;
                    //         i = i-1;
                    //     }
                // }
                }


            }

        }


    }

    public dequeue(): T {
        return this.arr.shift();
    }


    public get peek(): T {
        return this.arr[1];
    }

    public get end():T {
        return this.arr[this.arr.length-1];
    }


    public get length() {return this.arr.length;}

    public clean() {this.arr = [];}
}


let cyc = new PriorityQueue();
cyc.enqueue(6,6);
cyc.enqueue(3,3);
cyc.enqueue(5,5);
cyc.enqueue(5,9);

console.log(cyc);

