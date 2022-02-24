import Graph from "react-graph-vis";
import React, { useState } from "react";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

function randomColor() {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return `#${red}${green}${blue}`;
}

const nodes = {
  levels: [
    {
      id: 1,
      element: [
        { id: 1.1, label: "Node 1.1", color: "#e04141" },
        { id: 1.2, label: "Node 1.2", color: "#e04141" },
        { id: 1.3, label: "Node 1.3", color: "#e04141" },
      ],
    },
    {
      id: 2,
      element: [
        { id: 2.1, label: "Node 1.1", color: "#e09c41" },
        { id: 2.2, label: "Node 1.2", color: "#e09c41" },
        { id: 2.3, label: "Node 1.3", color: "#e09c41" },
      ],
    },
    {
      id: 3,
      element: [
        { id: 3.1, label: "Node 1.1", color: "#e0df41" },
        { id: 3.2, label: "Node 1.2", color: "#e0df41" },
        { id: 3.3, label: "Node 1.3", color: "#e0df41" },
      ],
    },
  ],
};
const newNode = nodes.levels.reduce((acc, el) => {
  acc = acc.concat([
    { id: el.id, label: `Node ${el.id}.0`, color: el.element[0].color },
    ...el.element,
  ]);
  return acc;
}, []);
const newEdge = nodes.levels.reduce((acc, el, index, self) => {
  acc = acc.concat(el.element.map((l) => ({ from: el.id, to: l.id })));
  if (self[index + 1]) {
    acc = acc.concat({ from: el.id, to: self[index + 1].id });
  }
  return acc;
}, []);
const App = () => {
  const createNode = (x, y) => {
    const color = randomColor();
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [...nodes, { id, label: `Node ${id}`, color, x, y }],
          edges: [...edges, { from, to: id }],
        },
        counter: id,
        ...rest,
      };
    });
  };
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: newNode,
      edges: newEdge,
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
        alert("Selected node: " + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      },
    },
  });
  const { graph, events } = state;
  return (
    <div>
      <h1>React graph vis</h1>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "640px" }}
      />
    </div>
  );
};

export default App;
