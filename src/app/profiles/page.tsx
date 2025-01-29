'use client';

import React, { useState } from 'react';
import { QualityProfileData } from '@data/flowchartData';
import FlowchartDebugPanel from './components/FlowchartDebugPanel';

interface Node {
  id: string;
  label: string;
  column: number;
}

interface ConditionalEdge {
  from: string;
  to: string;
  condition?: (selectedNodes: string[]) => boolean;
}

interface GraphData {
  nodes: Node[];
  edges: ConditionalEdge[];
}

// -------------------------
// 1) Collect edges we want to show
// -------------------------
function getEdgesToRender(graphData: GraphData, selectedNodes: string[]): ConditionalEdge[] {
  const filteredSelections = selectedNodes.filter(Boolean);
  if (filteredSelections.length === 0) {
    return [];
  }

  const edgesToRender: ConditionalEdge[] = [];

  // a) Highlight path edges for each consecutive pair in filteredSelections
  for (let i = 0; i < filteredSelections.length - 1; i++) {
    const fromId = filteredSelections[i];
    const toId = filteredSelections[i + 1];

    const pathEdge = graphData.edges.find(
      (e) => e.from === fromId && e.to === toId && (e.condition ? e.condition(filteredSelections) : true)
    );
    if (pathEdge) {
      edgesToRender.push(pathEdge);
    }
  }

  // b) Edges from the last non-empty selected node that pass condition
  const lastSelected = filteredSelections[filteredSelections.length - 1];
  const nextEdges = graphData.edges.filter(
    (e) => e.from === lastSelected && (e.condition ? e.condition(filteredSelections) : true)
  );
  edgesToRender.push(...nextEdges);

  return edgesToRender;
}

// -------------------------
// 2) Decide which columns to show
// -------------------------
function getVisibleColumns(graphData: GraphData, selectedNodes: string[], edgesToRender: ConditionalEdge[]) {
  const filteredSelections = selectedNodes.filter(Boolean);

  // Always show column 0 (so the user can start)
  const visible = new Set<number>([0]);

  // a) Columns of the selected nodes
  for (const selId of filteredSelections) {
    const node = graphData.nodes.find((n) => n.id === selId);
    if (node) {
      visible.add(node.column);
    }
  }

  // b) Columns from the "valid next edges" of the last selected node
  //    i.e. if there's a next edge from column 0 -> column 2, let's show column 2
  edgesToRender.forEach((edge) => {
    const fromNode = graphData.nodes.find((n) => n.id === edge.from);
    const toNode = graphData.nodes.find((n) => n.id === edge.to);
    if (!fromNode || !toNode) return;
    visible.add(fromNode.column);
    visible.add(toNode.column);
  });

  // c) Convert to a sorted array
  //    e.g. [0,2,3, ...]
  const sorted = Array.from(visible).sort((a, b) => a - b);

  return sorted;
}

const InteractiveFlowchart: React.FC = () => {
  const graphData: GraphData = QualityProfileData;
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // Handle node click logic (unchanged)
  const handleNodeClick = (nodeId: string): void => {
    const node = graphData.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    if (selectedNodes.length === 0) {
      // Must pick from column 0 first
      if (node.column !== 0) return;
      setSelectedNodes([nodeId]);
      return;
    }

    const lastSelectedId = selectedNodes[selectedNodes.length - 1];
    const lastSelectedNode = graphData.nodes.find((n) => n.id === lastSelectedId);
    if (!lastSelectedNode) return;

    // gather edges from lastSelectedId that pass condition
    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });

    // valid IDs we can go to from that node
    const validNextIds = validNextEdges.map((e) => e.to);

    // Check if user is going forward or backward
    const goingForward = validNextIds.includes(nodeId);
    const goingBack = node.column < lastSelectedNode.column;

    if (!goingForward && !goingBack) {
      // Not a valid forward or backward click
      return;
    }

    // If going back, only allow if this node is already selected
    if (goingBack) {
      if (!selectedNodes.includes(nodeId)) return;
      const index = selectedNodes.indexOf(nodeId);
      setSelectedNodes((prev) => prev.slice(0, index + 1));
      return;
    }

    // Otherwise, going forward
    const currentColumn = node.column;
    if (currentColumn < selectedNodes.length) {
      // Slice off any future picks if we're changing path
      setSelectedNodes((prev) => prev.slice(0, currentColumn));
    }

    setSelectedNodes((prev) => {
      const newSel = [...prev];
      newSel[currentColumn] = nodeId;
      return newSel;
    });
  };

  // Reset / Back
  const handleReset = () => setSelectedNodes([]);
  const handleBack = () => {
    if (selectedNodes.length > 0) {
      setSelectedNodes((prev) => prev.slice(0, prev.length - 1));
    }
  };

  // Calculate which edges to render
  const edgesToRender = getEdgesToRender(graphData, selectedNodes);

  // Calculate which columns to show, and build a "remap" so there's no gap
  const visibleColumns = getVisibleColumns(graphData, selectedNodes, edgesToRender);
  const columnRemap: Record<number, number> = {};
  visibleColumns.forEach((oldCol, idx) => {
    columnRemap[oldCol] = idx; // e.g. old column 2 -> new index 1
  });

  // Standard node positioning, but uses the "remapped" column instead
  const getNodePosition = (node: Node) => {
    // If the node's column is not in visibleColumns, we won't even render it,
    // but let's be defensive
    const newCol = columnRemap[node.column];
    const columnWidth = 200;
    const columnPadding = 100;
    const containerHeight = 400;

    // Among *only* the nodes in that visible column
    const nodesInThisVisibleCol = graphData.nodes.filter(
      (n) => visibleColumns.includes(n.column) && n.column === node.column
    );

    // We do the same rowIndex approach, but on the subset of that column's nodes
    const rowIndex = nodesInThisVisibleCol.findIndex((n) => n.id === node.id);
    const rowHeight = containerHeight / (nodesInThisVisibleCol.length + 1);

    return {
      x: newCol * columnWidth + columnPadding,
      y: (rowIndex + 1) * rowHeight,
    };
  };

  // 3) Render Edges with the new positions
  const renderEdges = () => {
    return edgesToRender.map((edge) => {
      const fromNode = graphData.nodes.find((n) => n.id === edge.from);
      const toNode = graphData.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return null;

      // If either column is hidden, skip
      if (!visibleColumns.includes(fromNode.column) || !visibleColumns.includes(toNode.column)) {
        return null;
      }

      // Check if this is a "chosen path" edge
      const isChosenPath = (() => {
        for (let i = 0; i < selectedNodes.length - 1; i++) {
          if (edge.from === selectedNodes[i] && edge.to === selectedNodes[i + 1]) {
            return true;
          }
        }
        return false;
      })();

      const strokeColor = isChosenPath ? '#3B82F6' : '#94A3B8';

      const fromPos = getNodePosition(fromNode);
      const toPos = getNodePosition(toNode);

      // Basic curve or line
      if (Math.abs(fromPos.y - toPos.y) < 5) {
        // Straight line
        return (
          <line
            key={`${edge.from}->${edge.to}`}
            x1={fromPos.x + 50}
            y1={fromPos.y}
            x2={toPos.x - 50}
            y2={toPos.y}
            stroke={strokeColor}
            strokeWidth={2}
          />
        );
      } else {
        // Curved line
        const cx1 = fromPos.x + (toPos.x - fromPos.x) / 3;
        const cx2 = fromPos.x + ((toPos.x - fromPos.x) * 2) / 3;
        const pathD = `
          M ${fromPos.x + 50} ${fromPos.y}
          C ${cx1} ${fromPos.y},
            ${cx2} ${toPos.y},
            ${toPos.x - 50} ${toPos.y}
        `;

        return <path key={`${edge.from}->${edge.to}`} d={pathD} fill="none" stroke={strokeColor} strokeWidth={2} />;
      }
    });
  };

  // 4) Render only nodes in visible columns
  const renderNodes = () => {
    // figure out valid next for highlighting
    const lastSelectedId = selectedNodes[selectedNodes.length - 1] || null;
    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });
    const validNextIds = validNextEdges.map((e) => e.to);

    return graphData.nodes
      .filter((node) => visibleColumns.includes(node.column))
      .map((node) => {
        const { x, y } = getNodePosition(node);
        const isSelected = selectedNodes.includes(node.id);
        const isNextAvailable = validNextIds.includes(node.id);

        let rectFill, rectStroke, textFill;
        if (isSelected) {
          rectFill = 'fill-blue-500';
          rectStroke = 'stroke-blue-600';
          textFill = 'fill-white';
        } else if (isNextAvailable) {
          rectFill = 'fill-blue-100';
          rectStroke = 'stroke-blue-200';
          textFill = 'fill-blue-900';
        } else {
          rectFill = 'fill-gray-100';
          rectStroke = 'stroke-gray-300';
          textFill = 'fill-gray-600';
        }

        return (
          <g
            key={node.id}
            transform={`translate(${x - 50}, ${y - 25})`}
            onClick={() => handleNodeClick(node.id)}
            className="cursor-pointer"
          >
            <rect width="100" height="50" rx="8" className={`${rectFill} ${rectStroke} stroke-1`} />
            <text x="50" y="30" textAnchor="middle" className={`${textFill} text-sm font-medium`}>
              {node.label}
            </text>
          </g>
        );
      });
  };

  // 5) (Optional) Debug lines only for visible columns
  const renderDebugGrid = () => {
    // We only draw lines for each visible column in sorted order
    const columnWidth = 200;
    const columnPadding = 100;
    const containerHeight = 400;

    return (
      <>
        {visibleColumns.map((col) => {
          const newCol = columnRemap[col];
          const columnX = newCol * columnWidth + columnPadding;
          return (
            <line
              key={`col-${col}`}
              x1={columnX}
              y1={0}
              x2={columnX}
              y2={containerHeight}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="4"
            />
          );
        })}

        {/* If you want row lines, do it similarly, but per column's nodes */}
        {visibleColumns.map((col) => {
          // The nodes *in that column*
          const colNodes = graphData.nodes.filter((n) => n.column === col);
          if (colNodes.length === 0) return null;

          const newCol = columnRemap[col];
          const columnX = newCol * columnWidth + columnPadding;

          const rowHeight = containerHeight / (colNodes.length + 1);
          return Array.from({ length: colNodes.length + 1 }).map((_, rowIndex) => (
            <line
              key={`row-${col}-${rowIndex}`}
              x1={columnX - 50}
              y1={rowHeight * (rowIndex + 1)}
              x2={columnX + 50}
              y2={rowHeight * (rowIndex + 1)}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ));
        })}
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-96 relative bg-gray-50 rounded-lg p-4">
        {/* Action buttons */}
        <div className="absolute top-2 left-2 flex space-x-2">
          <button onClick={handleReset} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
            Reset
          </button>
          <button
            onClick={handleBack}
            disabled={selectedNodes.length === 0}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            Back
          </button>
        </div>

        <svg className="w-full h-full">
          {renderDebugGrid()}
          {renderEdges()}
          {renderNodes()}
        </svg>
      </div>

      {/* Debug Panel */}
      <FlowchartDebugPanel selectedNodes={selectedNodes} graphData={graphData} />
    </div>
  );
};

export default InteractiveFlowchart;
