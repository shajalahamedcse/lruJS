function LRUCache(limit){
    // Current size of the cache
    this.size = 0;

    // Maximum number of items this cache can hold
    if(typeof(limit) === "number"){
        this.limit = limit;
    }
    else{
        this.limit = 10;
    }
    this.HashMap = new Map();
    this.head = null;
    this.tail = null;
}

// Structure of Node
function Node(key, value){
    if(typeof(key) !== "undefined" && key !== null){
        this.key = key;
    }
    if(typeof(value) !== "undefined" && value !== null){
        this.value = value;
    }
    this.left = null;
    this.right = null;
}

// Add new node to head 
LRUCache.prototype.addToHead = function(node){
    //console.log(node);
    node.right = this.head;
    
    node.left = null;
    if(this.head != null){
        this.head.left = node;
    }
    console.log(this.head);
    this.head = node;
    if(this.tail === null){
        this.tail = this.head;
    }
    //console.log(node)
}

LRUCache.prototype.get = function(key){
    if(this.HashMap.has(key)){
        var node = this.HashMap.get(key);
        LRUCache.prototype.addToHead(node);
        LRUCache.prototype.removeNode(node);
        return node.value;
    }
    return -1;
}

LRUCache.prototype.set = function(key, value){
    //console.log(LRUCache.prototype);
    // If this key already exists then we have to
    // make the value , head of the doubly linked list
    if(this.HashMap.has(key)){
        var node = this.HashMap.get(key);
        node.value = value;
        LRUCache.prototype.removeNode(node);
        LRUCache.prototype.addToHead(node);
    }
    else{
        var newNode = new Node(key,value);
        if(this.size > this.limit){
            this.HashMap.delete(this.tail.key);
            LRUCache.prototype.removeNode(this.tail);
            LRUCache.prototype.addToHead(newNode);
        }else{
            LRUCache.prototype.addToHead(newNode);
        }
        this.HashMap.set(key,newNode);
    }
}

LRUCache.prototype.removeNode = function(node){
    if(node.left !== null){
        node.left.right = node.right;
    }
    else{
        this.head = node.right;
    }

    if(node.right !== null){
        node.right.left = node.left;
    }
    else{
        this.tail = node.left;
    }
}

/** Returns a JSON (array) representation */
LRUCache.prototype.toJSON = function(){
    var s = [], node = this.head;
    //console.log(this);
    while(node !== null){
        s.push({key: node.key.toJSON(), value: node.key.toJSON()});
        node = node.right;
    }
    return s;
}
var c = new LRUCache(3);
c.set('adam', 29);
c.set('john', 26);
c.set('angela', 24);
//c.toString();        // -> "adam:29 < john:26 < angela:24"
//c.get('john');       // -> 26
// Now 'john' is the most recently used entry, since we just requested it
//c.toString();        // -> "adam:29 < angela:24 < john:26"
c.set('zorro', 141); // -> {key:adam, value:29}
// Because we only have room for 3 entries, put-ing 'zorro' purged 'adam'
//c.toString();        // -> "angela:24 < john:26 < zorro:141"
//console.log(c.toJSON());