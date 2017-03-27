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
        let data = file;
        console.log(data);
    }
});

