/**
 * Created by mlyskawi on 4/15/2017.
 */
class node {
}
class Trie {
    constructor(words, word) {
        this.words = words || [];
        this.word = word || [];
    }
    add(text) {
        if (this.main_node == undefined) {
            this.main_node = new node();
            this.main_node.symbol = null;
            this.main_node.child = null;
            this.main_node.next = null;
        }
        this.words = text.split(" ");
        for (let i = 0; i < this.words.length; i++) {
            this.word = this.words[i].split("");
            for (let j = 0; j < this.word.length; j++) {
                if (j == 0) {
                    if (this.main_node.child == null) {
                        let temp = new node();
                        temp.symbol = this.word[j];
                        temp.child = this.word[j + 1];
                        temp.next = null;
                        this.main_node.child = temp;
                    }
                    else {
                        let temp = this.main_node.child;
                        let checking = true;
                        while (checking) {
                            if (temp.symbol == this.word[j]) {
                                checking = false;
                                console.log(i, "  same");
                            }
                            else if (temp.next == null) {
                                let node1 = new node();
                                node1.symbol = this.word[j];
                                node1.child = null;
                                node1.next = null;
                                temp.next = node1;
                                checking = false;
                            }
                            else {
                                temp = temp.next;
                            }
                        }
                    }
                }
            }
        }
        return console.log(this.main_node);
    }
}
let text = "Microsoft researchers were working late into the hours the Friday before this holiday weekend looking to address yesterday’s Shadow Brokers dump of Windows exploits. In a message sent to TechCrunch overnight, the company said it has addressed the issue for systems running Windows 7 and later. “We’ve investigated and confirmed that the exploits disclosed by the Shadow Brokers have already been addressed by previous updates to our supported products,” the company wrote. “Customers with up-to-date software are already protected.” Microsoft also issued a blog post on the subject, noting that, as the company worked to verify the exploits, it discovered that nine were already been addressed by previously issued patches. Microsoft Security Response Center, naturally, recommends that users keep their machines up to date to ensure that they’re protected. There are three additional exploits not addressed by the aforementioned patches, though MS notes that they’re not capable of reproducing on machines running Windows 7 and above or recent versions of Exchange. Of course, that leave potential vulnerability for users still clinging to older versions of the operating system, as they’re no longer supported. Once again, Microsoft’s response would no doubt be: upgrade to ensure you’re protected. The dump was the second from Shadow Brokers this week, but the first that contained major exploits in several months. The exploits were believe to have originated from the National Security Agency as part of its work to monitor money flow in the SWIFT interbank messaging system. The NSA has been roundly criticized for not warning companies sooner that the tools had leaked, though it has yet to address any potential connection to the leak. And indeed, in a separate statement Microsoft confirmed the Agency hadn’t revealed potential vulnerabilities prior to yesterday’s mad dash to address the leaked exploits. “At this time,” said the spokesperson, “other than reporters, no individual or organization has contacted us in relation to the materials released by Shadow Brokers.”";
let newer = new Trie();
newer.add(text);
// let a = new node();
// a.symbol = "Kupa";
// console.log(a.symbol);
//
// let b = new node();
//# sourceMappingURL=Trie.js.map