/**
 * Created by mlyskawi on 4/2/2017.
 */

var PriorityQueue = (function () {
    function PriorityQueue(arr) {
        this.arr = arr || [];
    }
    PriorityQueue.prototype.enqueue = function (value, priority) {
        function Obejct(element, priority) {
            this.priority = priority;
            this.element = element;
        }
        this.object = new Obejct(value, priority);
        // this.object = {
        //     val:value,
        //     pri:priority,
        // };
        if (this.arr.length == 0) {
            this.arr.push(this.object);
        }
        else {
            console.log("KUPA");
        }
    };
    PriorityQueue.prototype.dequeue = function () {
        return this.arr.shift();
    };
    Object.defineProperty(PriorityQueue.prototype, "peek", {
        get: function () {
            return this.arr[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriorityQueue.prototype, "end", {
        get: function () {
            return this.arr[this.arr.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriorityQueue.prototype, "length", {
        get: function () { return this.arr.length; },
        enumerable: true,
        configurable: true
    });
    PriorityQueue.prototype.clean = function () { this.arr = []; };
    return PriorityQueue;
}());
var cyc = new PriorityQueue();
cyc.enqueue(3, 2);
var cyc1 = cyc.dequeue();
console.log(cyc1.priority);
