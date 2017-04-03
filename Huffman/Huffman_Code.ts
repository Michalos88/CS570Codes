/**
 * Created by mlyskawi on 4/2/2017.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PriorityQueue } from './PriorityQueue';
// Write a program that takes any input text and produces both a frequency table and the corresponding Huffman code.
//
//     Take approximately 360 words from any English document as your input text. Ignore all blanks, all punctuation marks, all special symbols. Create an input file with this input text.
//     Construct the frequency table according to the input text read from the file:
//     The frequency's must be listed, in order, from largest (at the top) to smallest (at the bottom)
// Then, using the Huffman algorithm, construct the optimal prefix binary code for the table.
//     The Huffman codes will be sorted in the same manner as the one above i.e. frequency, highest to lowest.
//     Design your program to read the input from the input file "infile.dat". Your program must produce the output, in the file "outfile.dat",(Files must be named "infile.dat" and "outfile.dat" consisting of
// the frequency table for the source text,
//     the Huffman code for each letter and digit in the source code, and
// the length of the coded message in terms of number of bits,

// let unwantedList = "";
//
//
// fs.readFile(path.join(__dirname,"infile"+".dat"),"utf-8", (err, file) => {
//     if (err) console.error("An error occurred while opening the file!", err);
//     else
//     {
//         let temp = file.split("");
//
//
//     }
// });
//

let data = "adsgsefsgi324idsjfsd";
let dataSplit = data.split("");

console.log(Huffman(dataSplit));
function Huffman(text) {

    let symbol_info = function (symbol, frequency, leaf) {
        this.symbol = symbol;
        this.frequency = frequency;
        this.leaf = leaf;
    };
    let Forest = new PriorityQueue();

    let Aplhabet = [];
    let collection = [];

    for (let i = 0; i < text.length - 1; i++) {
        if (Aplhabet.length == 0) {
            let temp = new symbol_info(text[i], 1, 1);
            Aplhabet.push(temp);
        }
        else {
            let added = 0;
            for (let j = 0; j < Aplhabet.length; j++) {
                if (text[i] == Aplhabet[j].symbol) {
                    Aplhabet[j].frequency++;
                    added++;
                }

            }
            if (added == 0) {
                let d = new symbol_info(text[i], 1, Aplhabet.length + 1);
                Aplhabet.push(d);

            }

        }

    }

    for (let i = 0; i < Aplhabet.length; i++) {
        Forest.enqueue(Aplhabet[i].leaf, Aplhabet[i].frequency)
    }

    let Tree = function (parent, left, right) {
        this.parent = parent;
        this.left = left;
        this.right = right;
    };
    let NewRoot = Forest.length;
    while (Forest.length != 2) {
        NewRoot++;
        let least = Forest.dequeue();
        let second = Forest.dequeue();
        let parentWeight = least.priority + second.priority;
        let NewTree = new Tree(NewRoot, least, second);
        // collection.push(NewTree);
        Forest.enqueue(NewTree, parentWeight)
    }

    let CharcBits = [];

    let character = function (charac, bit) {
        this.charac = charac;
        this.bit = bit;
    };

    let TopRoot = Forest.dequeue();

    function convert2bits(TopRoot1) {

        let leftchild = TopRoot1.value.left;
        let rightchild = TopRoot1.value.right;

        CharcBits.push(new character(leftchild,0));
        CharcBits.push(new character(rightchild,1));

        // if(typeof (leftchild) == "object"){
        //     convert2bits(leftchild)
        // }
        // else{
        //     collection.push(leftchild)
        // }
        //
        // if(typeof (rightchild) == "object"){
        //     convert2bits(rightchild)
        // }
        // else{
        //     collection.push(rightchild)
        // }
        //
        // console.log(collection);
        //
        //
        // return CharcBits
    }

    return convert2bits(TopRoot)


}



// roots.enqueue(temp,temp.frequency)
//
// roots[j].frequency++
//
// roots.enqueue(temp,temp.frequency)

// while (adding){
//     for (var j = 0; j < symbols.length; j++) {
//         console.log(symbols[j].symbol);
//         if (text[i] == symbols[j].symbol) {
//             symbols[j].frequency++;
//         }
//
//     }
// }
// }
// }
// return symbols;
// }
// roots.enqueue(temp,temp.frequency)
//
// roots[j].frequency++
//
// roots.enqueue(temp,temp.frequency)
// elseif
// var temp = new symbol_info(text[i], 1, 1);
// symbols.push(temp);
// }