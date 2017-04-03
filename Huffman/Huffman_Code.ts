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
    let Trees = [];

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
        Forest.enqueue(Aplhabet[i].leaf, Aplhabet[i].frequency);

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
        Trees.push(NewTree);
        Forest.enqueue(NewTree.parent, parentWeight)
    }


    let CharcBits = [];

    let character = function (charac, bit) {
        this.charac = charac;
        this.bit = bit;
    };
    let bitL ="";
    let bitR ="";
    while (Trees.length !=0){
        let TopRoot1 = Trees.pop();
        convert2bits(TopRoot1,bitL,bitR)


    }

    function bitofparent(arr,family){
        for (let i = 0; i < arr.length;i++){
            if (arr[i].charac == family){
                return arr[i].bit
            }


        }
    }

    function convert2bits(TopRoot,bitl,bitr) {

        let parent = TopRoot.parent;
        let leftchild = TopRoot.left.value;
        let rightchild = TopRoot.right.value;


        if (CharcBits.length == 0){
            bitl =bitl+0;
            bitr =bitr+1;
            CharcBits.push(new character(leftchild,bitl));
            CharcBits.push(new character(rightchild,bitr));
        }
        else{

            bitl = bitofparent(CharcBits,parent)+0;
            bitr = bitofparent(CharcBits,parent)+1;
            CharcBits.push(new character(leftchild,bitl));
            CharcBits.push(new character(rightchild,bitr));
        }


    }


    function HuffmanTable(arr,characters){
        let NewTable = [];
        let FrTable = [];
        for (let i = 0; i < arr.length;i++){
            for (let j = 0; j < characters.length;j++){
                if (arr[i].charac == characters[j].leaf){
                    NewTable.push(characters[j].symbol);
                    NewTable.push(arr[i].bit);
                    FrTable.push(characters[j].symbol);
                    FrTable.push((characters[j].frequency)/text.length*100);
                }
            }


        }

        // Huffman Table
        let output ="Symbol	Huffman Codes\n";
        let spaces1 = "  ";

        let comma  =",";
        let spaces2 = "        ";


        for (let i = 0; i < NewTable.length;i=i+2){
            output=output+spaces1+NewTable[i]+comma+spaces2+NewTable[i+1]+"\n";

        }

        // Frequency Table
        let outputFR ="Symbol	Frequency\n";

        for (let i = 0; i < FrTable.length; i=i+2){
            outputFR=outputFR+spaces1+FrTable[i]+comma+spaces2+FrTable[i+1]+"%"+"\n";
                }

        let totalBits = 0;
        for (let i = 1; i < FrTable.length-1; i=i+2) {

            totalBits=totalBits+Number(FrTable[i])*text.length/100+NewTable[i].length;
            }


        return outputFR+"   \n"+output+"   \n"+" Total Bits: "+totalBits
    }



    return HuffmanTable(CharcBits,Aplhabet)


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