LRU cache stand for Least Recently Used Cache. which evict least recently used entry. As Cache purpose is to provide fast and efficient way of retrieving data. it need to meet certain requirement.

Some of the Requirement are

    Fixed Size: Cache needs to have some bounds to limit memory usages.
    Fast Access: Cache Insert and lookup operation should be fast , preferably O(1) time.
    Replacement of Entry in case , Memory Limit is reached: A cache should have efficient algorithm to evict the entry when memory is full.

In case of LRU cache we evict least recently used entry so we have to keep track of recently used entries, entries which have not been used from long time and which have been used recently. plus lookup and insertion operation should be fast enough.

When we think about O(1) lookup , obvious data structure comes in our mind is HashMap. HashMap provide O(1) insertion and lookup. but HashMap does not has mechanism of tracking which entry has been queried recently and which not.

To track this we require another data-structure which provide fast insertion ,deletion and updation , in case of LRU we use Doubly Linkedlist . Reason for choosing doubly LinkList is O(1) deletion , updation and insertion if we have the address of Node on which this operation has to perform.

So our Implementation of LRU cache will have HashMap and Doubly LinkedList. In Which HashMap will hold the keys and address of the Nodes of Doubly LinkedList . And Doubly LinkedList will hold the values of keys.

As We need to keep track of Recently used entries, We will use a clever approach. We will remove element from bottom and add element on start of LinkedList and whenever any entry is accessed , it will be moved to top. so that recently used entries will be on Top and Least used will be on Bottom.