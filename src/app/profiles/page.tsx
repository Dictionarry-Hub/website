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

function getEdgesToRender(graphData: GraphData, selectedNodes: string[]): ConditionalEdge[] {
  // Filter out any empty/undefined slots
  const filteredSelections = selectedNodes.filter(Boolean);

  if (filteredSelections.length === 0) {
    return [];
  }

  const edgesToRender: ConditionalEdge[] = [];

  // 1. Highlight path edges for each consecutive pair in filteredSelections
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

  // 2. Edges from the **last non-empty** selected node that pass condition
  const lastSelected = filteredSelections[filteredSelections.length - 1];
  const nextEdges = graphData.edges.filter(
    (e) => e.from === lastSelected && (e.condition ? e.condition(filteredSelections) : true)
  );
  edgesToRender.push(...nextEdges);

  return edgesToRender;
}

const InteractiveFlowchart: React.FC = () => {
  const graphData: GraphData = QualityProfileData;
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

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

    // 1) gather edges from lastSelectedId that pass condition
    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });

    // 2) valid IDs we can go to from that node
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

  const handleReset = () => {
    // Reset all selections
    setSelectedNodes([]);
  };

  const handleBack = () => {
    // Remove only the last selected node
    if (selectedNodes.length > 0) {
      setSelectedNodes((prev) => prev.slice(0, prev.length - 1));
    }
  };

  // Standard node position logic
  const getNodePosition = (node: Node) => {
    const columnWidth = 200;
    const columnPadding = 100;
    const containerHeight = 400;
    const columnNodes = graphData.nodes.filter((n) => n.column === node.column);
    const rowIndex = columnNodes.findIndex((n) => n.id === node.id);
    const rowHeight = containerHeight / (columnNodes.length + 1);

    return {
      x: node.column * columnWidth + columnPadding,
      y: (rowIndex + 1) * rowHeight,
    };
  };

  // Debug grid (optional)
  const renderDebugGrid = () => {
    const maxColumn = Math.max(...graphData.nodes.map((n) => n.column));
    const columns = maxColumn + 1;
    const columnWidth = 200;
    const columnPadding = 100;
    const containerHeight = 400;

    return (
      <>
        {Array.from({ length: columns }).map((_, columnIndex) => {
          const columnX = columnIndex * columnWidth + columnPadding;
          return (
            <line
              key={`col-${columnIndex}`}
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
        {Array.from({ length: columns }).map((_, columnIndex) => {
          const colNodes = graphData.nodes.filter((n) => n.column === columnIndex);
          if (colNodes.length === 0) return null;
          const rowHeight = containerHeight / (colNodes.length + 1);
          return Array.from({ length: colNodes.length + 1 }).map((_, rowIndex) => (
            <line
              key={`row-${columnIndex}-${rowIndex}`}
              x1={columnIndex * columnWidth + columnPadding - 50}
              y1={rowHeight * (rowIndex + 1)}
              x2={columnIndex * columnWidth + columnPadding + 50}
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

  const edgesToRender = getEdgesToRender(graphData, selectedNodes);

  const renderEdges = () => {
    return edgesToRender.map((edge) => {
      const fromNode = graphData.nodes.find((n) => n.id === edge.from);
      const toNode = graphData.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return null;

      const isChosenPath = (() => {
        // If it's part of the consecutive pairs in selectedNodes
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
      const startX = fromPos.x + 50;
      const startY = fromPos.y;
      const endX = toPos.x - 50;
      const endY = toPos.y;

      // Straight line if almost same y
      if (Math.abs(startY - endY) < 5) {
        return (
          <line
            key={`${edge.from}->${edge.to}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke={strokeColor}
            strokeWidth="2"
          />
        );
      } else {
        // Curved path
        const cx1 = startX + (endX - startX) / 3;
        const cx2 = startX + ((endX - startX) * 2) / 3;
        return (
          <path
            key={`${edge.from}->${edge.to}`}
            d={`
              M ${startX} ${startY}
              C ${cx1} ${startY}
                ${cx2} ${endY}
                ${endX} ${endY}
            `}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
          />
        );
      }
    });
  };

  const renderNodes = () => {
    const lastSelectedId = selectedNodes[selectedNodes.length - 1] || null;

    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });
    const validNextIds = validNextEdges.map((e) => e.to);

    return graphData.nodes.map((node) => {
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
