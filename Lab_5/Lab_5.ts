/**
 * Created by mlyskawi on 3/26/2017.
 */

// Reference: Learning JavaScript Data Structures and Algorithms, by Loiane Groner

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

fs.readFile(path.join(__dirname,"infile"+".dat"),"utf-8", (err, file) => {
    if (err) console.error("An error occurred while opening the file!", err);
    else
    {
        let temp = file.split(",");
        let Set = new SortedSet();
        for (let i = 0; i< temp.length; i++){
            Set.add(temp[i]);
        }

        let rl = readline.createInterface(process.stdin, process.stdout);
        rl.question("Search for: ", value => {
            if (Set.contains(value)){
                rl.close();
                return console.log("Yes");
            }
            else {
                rl.close();
                return console.log("No");
            }



        })
    }
});


function SortedSet() {

    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    let root = null;


    let insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };

    this.add = function(key){
        let newNode = new Node(key);
        if (root === null){
            root = newNode;
        } else {
            insertNode(root,newNode);
        }
    };


    this.isEmpty = function () {
        if (root != null){
            return false;
        }
        else {
            return true;
        }

    };


    this.contains = function(key){
        return searchNode(root, key);
    };

    let searchNode = function(node, key){
        if (node === null){
            return false;
        }
        if (key < node.key){
            return searchNode(node.left, key);
        } else if (key > node.key){
            return searchNode(node.right, key);
        }
        else {
            return true;
        }
    };

    let findMinNode = function (node) {
        if (node){
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        }
        return null;
    };
    this.remove = function(key){
        root = removeNode(root, key);
    };

    let removeNode = function(node, key){
        if (node === null){
            return null;
        }
        if (key < node.key){
            node.left = removeNode(node.left, key);
            return node;
        } else if (key > node.key){
            node.right = removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null){
                node = null;
                return node;
            }
            if (node.left === null){
                node = node.right;
                return node;
            } else if (node.right === null){
                node = node.left;
                return node;
            }
            let aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };



}



