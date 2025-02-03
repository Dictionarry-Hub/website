// src/app/builder/components/InteractiveFlowchart.tsx

'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QualityProfileData, nodeTypeToIcon } from '@data/flowchartData';
import RecommendHeader from './RecommendHeader';
import FlowchartInfo from './FlowchartInfo';

interface Node {
  id: string;
  label: string;
  column: number;
  type: keyof typeof nodeTypeToIcon;
  typeLabel: string;
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
  const filteredSelections = selectedNodes.filter(Boolean);
  if (filteredSelections.length === 0) return [];

  const edgesToRender: ConditionalEdge[] = [];

  // (a) Chosen path edges
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

  // (b) Next possible edges from the last selected
  const lastSelected = filteredSelections[filteredSelections.length - 1];
  const nextEdges = graphData.edges.filter(
    (e) => e.from === lastSelected && (e.condition ? e.condition(filteredSelections) : true)
  );
  edgesToRender.push(...nextEdges);

  return edgesToRender;
}

function getVisibleColumns(graphData: GraphData, selectedNodes: string[], edgesToRender: ConditionalEdge[]) {
  const filteredSelections = selectedNodes.filter(Boolean);
  const visible = new Set<number>([0]); // always show col 0

  // (a) columns of selected
  for (const selId of filteredSelections) {
    const node = graphData.nodes.find((n) => n.id === selId);
    if (node) {
      visible.add(node.column);
    }
  }

  // (b) columns from edges
  for (const edge of edgesToRender) {
    const fromNode = graphData.nodes.find((n) => n.id === edge.from);
    const toNode = graphData.nodes.find((n) => n.id === edge.to);
    if (fromNode) visible.add(fromNode.column);
    if (toNode) visible.add(toNode.column);
  }

  return Array.from(visible).sort((a, b) => a - b);
}

function positionsAreEqual(
  oldPositions: Record<string, { left: number; top: number; width: number; height: number }>,
  newPositions: Record<string, { left: number; top: number; width: number; height: number }>
) {
  const oldKeys = Object.keys(oldPositions);
  const newKeys = Object.keys(newPositions);
  if (oldKeys.length !== newKeys.length) return false;

  for (const key of oldKeys) {
    const oldVal = oldPositions[key];
    const newVal = newPositions[key];
    if (!newVal) return false;
    if (
      oldVal.left !== newVal.left ||
      oldVal.top !== newVal.top ||
      oldVal.width !== newVal.width ||
      oldVal.height !== newVal.height
    ) {
      return false;
    }
  }
  return true;
}

const InteractiveFlowchart: React.FC = () => {
  const graphData: GraphData = QualityProfileData;
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Keep a ref to the single toast ID
  const zoomToastRef = useRef<React.ReactText | null>(null);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      // Typically on Windows: ctrlKey, on Mac: metaKey
      if (e.ctrlKey || e.metaKey) {
        // Reset the flowchart
        setSelectedNodes([]);

        // If no active toast yet, create a new one
        if (!zoomToastRef.current || !toast.isActive(zoomToastRef.current)) {
          zoomToastRef.current = toast.warn('Canvas reset due to zoom detected!', {
            position: 'top-right',
            autoClose: 2500,
          });
        } else {
          // If toast is already active, update it and reset timer
          toast.update(zoomToastRef.current, {
            render: 'Canvas reset due to zoom detected!',
            type: 'warning',
            autoClose: 2500,
            isLoading: false,
          });
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Recalculate edges/columns
  const edgesToRender = getEdgesToRender(graphData, selectedNodes);
  const visibleColumns = getVisibleColumns(graphData, selectedNodes, edgesToRender);

  // Container + node refs
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [nodePositions, setNodePositions] = useState<
    Record<string, { left: number; top: number; width: number; height: number }>
  >({});

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, { left: number; top: number; width: number; height: number }> = {};

    graphData.nodes
      .filter((n) => visibleColumns.includes(n.column))
      .forEach((node) => {
        const el = nodeRefs.current[node.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();

        newPositions[node.id] = {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          width: rect.width,
          height: rect.height,
        };
      });

    if (!positionsAreEqual(nodePositions, newPositions)) {
      setNodePositions(newPositions);
    }
  }, [graphData, visibleColumns, selectedNodes, nodePositions]);

  // Handle node clicks
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
    const validNextIds = validNextEdges.map((e) => e.to);

    // forward or backward?
    const goingForward = validNextIds.includes(nodeId);
    const goingBack = node.column < lastSelectedNode.column;

    if (!goingForward && !goingBack) return;

    // if going back
    if (goingBack) {
      if (!selectedNodes.includes(nodeId)) return;
      const index = selectedNodes.indexOf(nodeId);
      setSelectedNodes((prev) => prev.slice(0, index + 1));
      return;
    }

    // going forward
    const currentColumn = node.column;
    if (currentColumn < selectedNodes.length) {
      // slice off future picks
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

  // Render edges
  const renderEdges = () => {
    return edgesToRender.map((edge) => {
      const fromNode = graphData.nodes.find((n) => n.id === edge.from);
      const toNode = graphData.nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return null;
      if (!visibleColumns.includes(fromNode.column) || !visibleColumns.includes(toNode.column)) return null;

      // Is it part of the chosen path?
      const isChosenPath = (() => {
        for (let i = 0; i < selectedNodes.length - 1; i++) {
          if (edge.from === selectedNodes[i] && edge.to === selectedNodes[i + 1]) return true;
        }
        return false;
      })();
      const strokeColor = isChosenPath ? '#3B82F6' : '#94A3B8';

      const fromPos = nodePositions[fromNode.id];
      const toPos = nodePositions[toNode.id];
      if (!fromPos || !toPos) return null;

      const x1 = fromPos.left + fromPos.width;
      const y1 = fromPos.top + fromPos.height / 2;
      const x2 = toPos.left;
      const y2 = toPos.top + toPos.height / 2;

      // If basically horizontal, draw a line
      if (Math.abs(y1 - y2) < 6) {
        return (
          <line
            key={`${edge.from}->${edge.to}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={strokeColor}
            strokeWidth={2}
            strokeDasharray="2 4"
          />
        );
      } else {
        // Otherwise, a simple cubic curve
        const cx1 = x1 + (x2 - x1) / 3;
        const cx2 = x1 + ((x2 - x1) * 2) / 3;
        const pathD = `
          M ${x1} ${y1}
          C ${cx1} ${y1},
            ${cx2} ${y2},
            ${x2} ${y2}
        `;
        return (
          <path
            key={`${edge.from}->${edge.to}`}
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2}
            strokeDasharray="2 4"
          />
        );
      }
    });
  };

  // Render columns & nodes
  const renderColumns = () => {
    const lastSelectedId = selectedNodes[selectedNodes.length - 1] || null;
    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });
    const validNextIds = validNextEdges.map((e) => e.to);

    return visibleColumns.map((col) => {
      const colNodes = graphData.nodes.filter((n) => n.column === col);
      return (
        <div
          key={col}
          className="flex-1 flex flex-col justify-center items-center space-y-4 bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          {colNodes.map((node) => {
            const isSelected = selectedNodes.includes(node.id);
            const isNextAvailable = (selectedNodes.length === 0 && node.column === 0) || validNextIds.includes(node.id);

            const Icon = nodeTypeToIcon[node.type];

            return (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`
                  relative cursor-pointer rounded-md transition-all duration-200
                  bg-gray-100 dark:bg-gray-900 shadow-sm rounded-xl
                  flex items-stretch
                  ${isSelected ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                  ${!isSelected && !isNextAvailable ? 'opacity-50' : 'opacity-100'}
                `}
              >
                {/* Icon container */}
                <div
                  className="
                    bg-gray-200 dark:bg-gray-700
                    rounded-lg flex items-center justify-center
                    p-3 m-2
                  "
                >
                  <Icon
                    size={20}
                    className={isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-black dark:text-white'}
                  />
                </div>
                {/* Text container */}
                <div className="flex flex-col justify-center pr-3 py-2">
                  <div
                    className={`
                      text-xs font-medium
                      ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-white-700'}
                    `}
                  >
                    {node.typeLabel}
                  </div>
                  <div
                    className={`
                      text-sm font-medium
                      ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400'
                          : isNextAvailable
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-black dark:text-white'
                      }
                    `}
                  >
                    {node.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="">
      <ToastContainer />
      <RecommendHeader onReset={handleReset} onBack={handleBack} canGoBack={selectedNodes.length > 0} />
      <div
        ref={containerRef}
        className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto"
        style={{ height: 450 }}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {renderEdges()}
        </svg>
        <div className="flex items-stretch space-x-12 h-full">{renderColumns()}</div>
      </div>
      <FlowchartInfo selectedNodes={selectedNodes} hoveredNodeId={hoveredNodeId} />
    </div>
  );
};

export default InteractiveFlowchart;
