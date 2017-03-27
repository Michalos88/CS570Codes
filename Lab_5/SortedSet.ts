/**
 * Created by mlyskawi on 3/26/2017.
 */
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
        return searchNode(root, key); //{1}
    };

    let searchNode = function(node, key){
        if (node === null){ //{2}
            return false;
        }
        if (key < node.key){ //{3}
            return searchNode(node.left, key); //{4}
        } else if (key > node.key){ //{5}
            return searchNode(node.right, key); //{6}
        } else {
            return true; //{7}
        }
    };

    let findMinNode = function (node) {
        if (node){
            while (node && node.left !== null) { //{2}
                node = node.left; //{3}
            }
            return node;
        }
        return null; //{4}
    };
    this.remove = function(key){
        root = removeNode(root, key); //{1}
    };

    let removeNode = function(node, key){
        if (node === null){ //{2}
            return null;
        }
        if (key < node.key){ //{3}
            node.left = removeNode(node.left, key); //{4}
            return node; //{5}
        } else if (key > node.key){ //{6}
            node.right = removeNode(node.right, key); //{7}
            return node; //{8}
        } else { // key is equal to node.key
//case 1 - a leaf node
            if (node.left === null && node.right === null){ //{9}
                node = null; //{10}
                return node; //{11}
            }
//case 2 - a node with only 1 child
            if (node.left === null){ //{12}
                node = node.right; //{13}
                return node; //{14}
            } else if (node.right === null){ //{15}
                node = node.left; //{16}
                return node; //{17}
            }
//case 3 - a node with 2 children
            let aux = findMinNode(node.right); //{18}
            node.key = aux.key; //{19}
            node.right = removeNode(node.right, aux.key); //{20}
            return node; //{21}
        }
    };



}



