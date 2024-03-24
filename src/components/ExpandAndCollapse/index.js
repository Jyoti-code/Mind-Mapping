import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import "./index.css";

const initialNodes = [
  {
    id: "1",
    name: "Car",
    children: [
      {
        id: "2",
        name: "Research",
        parent: "1",
        children: [
          {
            id: "3",
            name: "External",
            parent: "2",
            children: [
              {
                id: "4",
                parent: "3",
                name: "B2C",
                children: [
                  {
                    id: "5",
                    parent: "4",
                    name: "Online",
                  },
                  {
                    id: "6",
                    parent: "4",
                    name: "Interview",
                  },
                  {
                    id: "7",
                    parent: "4",
                    name: "Public Data",
                  },
                  {
                    id: "8",
                    parent: "4",
                    name: "Health",
                  },
                ],
              },
              {
                id: "9",
                parent: "3",
                name: "B2B",
              },
            ],
          },
          {
            id: "10",
            name: "Internal",
            parent: "2",
          },
        ],
      },

      {
        id: "11",
        name: "Planning",
        parent: "1",
        children: [
          {
            id: "12",
            name: "PRD",
            parent: "11",
          },
          {
            id: "13",
            name: "Specs",
            parent: "11",
          },
        ],
      },
      {
        id: "14",
        name: "Designing",
        parent: "1",
        children: [
          {
            id: "15",
            name: "Hardware",
            parent: "14",
          },
          {
            id: "16",
            name: "Software",
            parent: "14",
          },
        ],
      },
      {
        id: "17",
        name: "Manufacturing",
        parent: "1",
        children: [
          {
            id: "18",
            name: "Material",
            parent: "17",
          },
          {
            id: "19",
            name: "Production",
            parent: "17",
          },
        ],
      },
      {
        id: "20",
        name: "Sales/Marketing",
        parent: "1",
        children: [
          {
            id: "21",
            name: "Online",
            parent: "20",
          },
          {
            id: "22",
            name: "Dealership",
            parent: "20",
          },
        ],
      },
    ],
  },
];

const initialEdges = [
  {
    id: "edges-e5-7",
    source: "0",
    target: "1",
    label: "+",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#FFCC00", color: "#fff", fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

let id = 1;
// const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 11.5, 
};

const ExpandAndCollapse = (props) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleNodeMouseEnter = (event, node) => {
    if (
      node.id === "5" ||
      node.id === "6" ||
      node.id === "7" ||
      node.id === "8"
    ) {
      setIsHovered(true);
    }
  };

  const handleNodeMouseLeave = (event, node) => {
    if (
      node.id === "5" ||
      node.id === "6" ||
      node.id === "7" ||
      node.id === "8"
    ) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    setNodes([
      ...initialNodes.map((item) => {
        return {
          id: item.id,
          type: item?.children?.length ? "default" : "output",
          data: { label: item.name, children: item.children },
          position: { x: 0, y: 0 },
          sourcePosition: "right",
          targetPosition: "left",
        };
      }),
    ]);
  }, []);

  const handleNodeClick = (e, data) => {
    const findChildren = nodes.filter((item) => item?.data?.parent === data.id);
    if (!findChildren.length) {
      const itemChildren = [
        ...data.data.children.map((item, i) => {
          return {
            id: item.id,
            type: item?.children?.length ? "default" : "output",
            data: {
              label: item.name,
              children: item.children,
              parent: item.parent,
            },
            position: {
              x: data.position.x + 200,
              y: i === 0 ? data.position.y : data.position.y + i * 100,
            },
            sourcePosition: "right",
            targetPosition: "left",
          };
        }),
      ];
      setEdges([
        ...edges,
        ...itemChildren.map((item) => {
          return {
            id: String(parseInt(Math.random(100000000) * 1000000)),
            source: item?.data?.parent,
            target: item?.id,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          };
        }),
      ]);
      setNodes(nodes.concat(itemChildren));
    } else {
      setNodes([...nodes.filter((item) => item?.data?.parent !== data.id)]);
      setEdges([...edges.filter((item) => data.id !== item.source)]);
    }
  };

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        fitView
        maxZoom={0.9}
        defaultViewport={{ x: 2, y: 1, zoom: 0.5 }}
        fitViewOptions={fitViewOptions}        
      />
      {isHovered && (
        <div style={{ position: 'absolute', top: '170px', right: '50px' }}>
          <div className="card">
            <div className="card-body">
              <h6>Customer Review</h6>
              <div>
                <span style={{ display: 'inline-block',marginRight:'7px' }}>Pos  </span>
                <div className="bar-5" style={{ display: 'inline-block', width: '60%', height: '18px', backgroundColor: '#04AA6D' }}></div>
              </div>
              <div>
                <span style={{ display: 'inline-block',marginRight:'6px' }}>Neg  </span>
                <div className="bar-5" style={{ display: 'inline-block', width: '40%', height: '18px', backgroundColor: '#f44336' }}></div>
              </div>
              <div>
                <span style={{ display: 'inline-block',marginRight:'15px' }}>All  </span>
                <div className="bar-5" style={{ display: 'inline-block', width: '20%', height: '18px', backgroundColor: '#ff9800' }}></div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <ExpandAndCollapse />
  </ReactFlowProvider>
);
