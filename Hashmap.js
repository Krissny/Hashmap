class Node {
  constructor(value, key, next = null) {
    this.data = value;
    this.key = key;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
    this.tail = null;
  }

  //add values at the end
  append(value, key) {
    let node = new Node(value, key);
    let current;
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
      this.tail = current.next;
    }
    this.length++;
  }

  //check if value exist
  contains(value) {
    let current = this.head;
    while (current != null) {
      if (current.data == value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  find(key, value) {
    let current = this.head;
    while (current != null) {
      if (current.key == key) {
        current.data = value;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  //to remove an element at a given index
  removeAt(index) {
    let current = this.head;
    let prev;
    if (index >= this.length || index < 0) {
      return "Invalid index value!";
    } else if (index === 0) {
      this.head = this.head.next;
      this.tail = this.head;
      this.length--;
      return;
    }
    while (index--) {
      prev = current;
      current = current.next;
    }
    if (current === this.tail) {
      this.tail = prev;
    }
    prev.next = current.next;
    this.length--;
  }

  //to get size of LL
  getSize() {
    return this.length;
  }

  //   //print the list in a string
  //   toString() {
  //     let current = this.head;
  //     while (current != null) {
  //       process.stdout.write(`(${current.data})->`);
  //       current = current.next;
  //     }
  //     console.log(`(null)`);
  //   }
}

class Hashmap {
  constructor() {
    this.size = 100;
    this.hashTable = Array(this.size).fill(-1);
    this.length = 0;
  }

  //to create hash
  hash(key) {
    let mod = 99;
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % mod;
    }

    return hashCode;
  }

  //set key value pairs
  set(key, value) {
    const hashCode = this.hash(key);
    if (this.hashTable[hashCode] != -1) {
      if (this.hashTable[hashCode].find(key, value)) {
        this.length++;
        return;
      }
      this.hashTable[hashCode].append(value, key);
      this.length++;
      return;
    }
    let LL = new LinkedList();
    LL.append(value, key);
    this.hashTable[hashCode] = LL;
    this.length++;
  }

  //find a key
  get(key) {
    const hashCode = this.hash(key);
    if (this.hashTable[hashCode] != -1) {
      let current = this.hashTable[hashCode].head;
      console.log(current);
      while (current != null) {
        if (current.key == key) {
          return current.data;
        }
        current = current.next;
      }
    }
  }

  //to find if a key exist or not
  has(key) {
    const hashCode = this.hash(key);
    if (this.hashTable[hashCode] != -1) {
      let current = this.hashTable[hashCode].head;
      while (current != null) {
        if (current.key == key) {
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  //to delete a key and its value if it exist
  remove(key) {
    const hashCode = this.hash(key);
    if (this.hashTable[hashCode] != -1) {
      let current = this.hashTable[hashCode].head;
      let count = 0;
      while (current != null) {
        if (current.key == key) {
          this.hashTable[hashCode].removeAt(count);
          if (this.hashTable[hashCode].head === null) {
            this.hashTable[hashCode] = -1;
            this.length--;
          }
          return true;
        }
        current = current.next;
        count++;
      }
      return false;
    }
  }

  //to get no of keys stored in the map
  getSize() {
    let ans = 0;
    this.hashTable.forEach((element) => {
      if (element != -1) {
        ans += element.length;
      }
    });
    return ans;
  }
  //to empty the hashmap
  clear() {
    this.hashTable = Array(this.size).fill(-1);
    this.length = 0;
  }

  //return all the keys
  keys() {
    let ans = [];
    this.hashTable.forEach((element) => {
      if (element != -1) {
        let current = element.head;
        while (current != null) {
          ans.push(current.key);
          current = current.next;
        }
      }
    });
    return ans;
  }

  //similary we get the values
  values() {
    let ans = [];
    this.hashTable.forEach((element) => {
      if (element != -1) {
        let current = element.head;
        while (current != null) {
          ans.push(current.data);
          current = current.next;
        }
      }
    });
    return ans;
  }

  //lets get the enteries now
  entries() {
    let keys = this.keys();
    let values = this.values();
    let ans = [];
    for (let i = 0; i < keys.length; i++) {
      let temp = [];
      temp.push(keys[i]);
      temp.push(values[i]);
      ans.push(temp);
    }
    return ans;
  }
}

let hashmap = new Hashmap();
hashmap.set("krishna", "is a good boy");
hashmap.set("rishnak", "is a good boy");
hashmap.set("krishna", "is a bad boy");
hashmap.set("devanshu", "is a good boy");
console.log(hashmap.get("krishna"));
console.log(hashmap.has("krisna"));
hashmap.remove("devanshu");
console.log(hashmap.getSize());
console.log(hashmap);
console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
