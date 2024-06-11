/*

Linked List Intersection Question
Programming challenge description:
Please watch the video below before starting the test:

https://youtu.be/zCezJ8QkUL4

Linked List Intersection Question

You are given a collection of singly-linked lists (SLLs). Return true of any if them share a common node (or “intersect”), or false otherwise.

Additional notes

Please don’t use recursion. Assume the SLLs might be very large in length (in the millions).
Stop traversing and return immediately if you detect a common node.
If a cycle is detected, please throw an error.
Aim to be as efficient as possible from a time complexity perspective.
Implement this function with this signature:

DoLinkedListsIntersect(Collection<SinglyLinkedList>) returns bool

Input:
Your program should read lines of text from the standard input in Codevue. The first lines of the input will describe the singly-linked-lists in a directed acyclic graph (DAG) format. The graph description language is a similar idea to the GraphViz graph description language, see: https://en.wikipedia.org/wiki/DOT_(graph_description_language).

Each node is described as a string token, which is a unique identifier for the node. So “a->b” means a DAG with node “a” directionally connected to node “b”. As we are describing singly-linked-lists, take it as a given that the out degree of every node is either zero or one.

After each of the edges has been described, then each subsequent line will include set of SLL starting nodes to traverse from. We advise that you draw a diagram to help you understand the example more clearly.

Note: we have added an attachment image to show this visually.

Output:
For each SLL print 'True' or 'False' based on the return value of your function

true prints True
false prints False
On throwing an error print Error Thrown!

Test 1
Test Input
Test 1 Input
a->b
r->s
b->c
x->c
q->r
y->x
w->z
a,q,w
a,c,r
y,z,a,r
a,w


Expected Output
Test 1 Output
False
True
True
False

Test 2
Test Input
Test 2 Input
A->B
G->B
B->C
C->D
D->E
H->J
J->F
A,G,E
H,A


Expected Output
Test 2 Output
True
False

Test 3
Test Input
Test 3 Input
ABC->BCD
BCD->CDE
DEF->EFG
EFG->BCD
123->456
ABC,CDE
123,DEF
ABC,DEF

Expected Output
Test 3 Output
True
False
True

Test 4
Test Input
Test 4 Input
X->Y
Y->X
A->B
B->C
X,A

Expected Output
Test 4 Output
Error Thrown!
*/
function findIntersections(lines) {
  const graph = new Map();

  for (const line of lines) {
    if (line.includes(",")) {
      let returnValue;
      try {
        returnValue = findIntersection(
          line.split(",").map((v) => v.trim()),
          graph
        ).toString();
      } catch (ex) {
        if (ex.message === "Cycle detected.") {
          returnValue = "Error Thrown!";
        } else {
          console.error(ex.message);
        }
      }
      console.log(returnValue); // Output or handle the yielded value appropriately
    } else if (line.includes("->")) {
      const [current, next] = line.split("->").map((v) => v.trim());

      if (!graph.has(next)) {
        graph.set(next, new Node(next));
      }

      const nextNode = graph.get(next);
      const currentNode = graph.has(current)
        ? graph.get(current)
        : new Node(current);
      currentNode.next = nextNode;
      graph.set(current, currentNode);
    }
  }
}

function findIntersection(nodeGroup, graph) {
  const allTraversedNodes = new Set();

  for (const value of nodeGroup) {
    if (!graph.has(value)) {
      continue;
    }

    const currentTraversedNodes = new Set();
    let node = graph.get(value);

    while (node) {
      if (allTraversedNodes.has(node.value)) {
        return true;
      }

      if (currentTraversedNodes.has(node.next?.value)) {
        throw new Error("Cycle detected.");
      }

      allTraversedNodes.add(node.value);
      currentTraversedNodes.add(node.value);

      node = node.next;
    }
  }

  return false;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const input = `a->b
r->s
b->c
x->c
q->r
y->x
w->z
a,q,w
a,c,r
y,z,a,r
a,w`;

const input2 = `A->B
G->B
B->C
C->D
D->E
H->J
J->F
A,G,E
H,A`;

const input3 = `ABC->BCD
BCD->CDE
DEF->EFG
EFG->BCD
123->456
ABC,CDE
123,DEF
ABC,DEF`;

const input4 = `X->Y
Y->X
A->B
B->C
X,A`;

findIntersections(input.split("\n"));
console.log("----");

findIntersections(input2.split("\n"));
console.log("----");

findIntersections(input3.split("\n"));
console.log("----");

findIntersections(input4.split("\n"));
console.log("----");
