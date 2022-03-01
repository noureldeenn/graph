import Graph from "react-graph-vis";
import React, { useState, useEffect, useMemo, useCallback } from "react";

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: "#000000",
  },
};

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
        { id: 2.1, label: "Node 2.1", color: "#e09c41" },
        { id: 2.2, label: "Node 2.2", color: "#e09c41" },
        { id: 2.3, label: "Node 2.3", color: "#e09c41" },
      ],
    },
    {
      id: 3,
      element: [
        { id: 3.1, label: "Node 3.1", color: "#e0df41" },
        { id: 3.2, label: "Node 3.2", color: "#e0df41" },
        { id: 3.3, label: "Node 3.3", color: "#e0df41" },
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
// const newEdge = nodes.levels.reduce((acc, el, index, self) => {
//   acc = acc.concat(el.element.map((l) => ({ from: el.id, to: l.id })));
//   if (self[index + 1]) {
//     acc = acc.concat({ from: el.id, to: self[index + 1].id });
//   }
//   return acc;
// }, []);
const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [graph, setGraph] = useState({
    nodes: newNode,
    edges: [],
  });

  const click = useCallback(({ nodes, edges }) => {
    console.log("Selected nodes:", nodes);
    console.log({ nodes });
    setSelectedItems((prev) => [...prev, ...nodes]);
    console.log("Selected edges:", edges);
  }, []);
  useEffect(() => {
    if (selectedItems.length === 2) {
      setGraph((prev) => ({
        ...prev,
        edges: [
          ...prev.edges,
          { from: selectedItems[0], to: selectedItems[1] },
        ],
      }));
      setSelectedItems([]);
    }
  }, [selectedItems]);

  const events = useMemo(
    () => ({
      click,
    }),
    [click]
  );

  return (
    <>
      <div>
        <h1>React graph vis</h1>
        <Graph
          graph={graph}
          options={options}
          events={events}
          style={{ height: "640px" }}
        />
      </div>
    </>
  );
};

export default App;
