import React, { useState, useRef, useLayoutEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QualityProfileData, nodeTypeToIcon } from '@data/flowchartData';
import { columnInfo } from '@/data/profileInfoData';
import RecommendHeader from './RecommendHeader';
import MobileRecommendations from './MobileRecommendations';
import NodeInfoModal from './NodeInfoModal';
import { useLongPress } from '@hooks/useLongPress';

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

const FlowchartNode = React.memo(
  ({
    node,
    isSelected,
    isNextAvailable,
    onSelect,
    onShowInfo,
    nodeRef,
  }: {
    node: Node;
    isSelected: boolean;
    isNextAvailable: boolean;
    onSelect: () => void;
    onShowInfo: () => void;
    nodeRef: (el: HTMLDivElement | null) => void;
  }) => {
    const longPressProps = useLongPress({
      onLongPress: onShowInfo,
      onClick: onSelect,
    });

    const Icon = nodeTypeToIcon[node.type];

    return (
      <div
        ref={nodeRef}
        {...longPressProps}
        className={`
          flex-1 min-w-0
          relative rounded-lg transition-all duration-200
          bg-gray-100 dark:bg-gray-900 
          ${isSelected ? 'border-2 border-blue-500 dark:border-blue-400' : 'border border-gray-200 dark:border-gray-700'}
          ${!isSelected && !isNextAvailable ? 'opacity-50' : 'opacity-100'}
          p-1.5 cursor-pointer active:bg-gray-200 dark:active:bg-gray-800
        `}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon
            size={12}
            className={`
              shrink-0 opacity-100
              ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
            `}
          />
          <div className="min-w-0 truncate">
            <div
              className={`
                text-xs font-medium truncate
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
      </div>
    );
  }
);

const MobileInteractiveFlowchart: React.FC = () => {
  const graphData = QualityProfileData;
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedInfoNode, setSelectedInfoNode] = useState<Node | null>(null);

  // Container + node refs for edge rendering
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Position calculation for edges
  const [nodePositions, setNodePositions] = useState<
    Record<string, { left: number; top: number; width: number; height: number }>
  >({});

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, { left: number; top: number; width: number; height: number }> = {};

    visibleColumns.forEach((col) => {
      graphData.nodes
        .filter((n) => n.column === col)
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
    });

    setNodePositions(newPositions);
  }, [selectedNodes]);

  // Get visible columns and edges
  const getEdgesToRender = () => {
    const filteredSelections = selectedNodes.filter(Boolean);
    if (filteredSelections.length === 0) return [];

    const edgesToRender = [];

    // Add chosen path edges
    for (let i = 0; i < filteredSelections.length - 1; i++) {
      const fromId = filteredSelections[i];
      const toId = filteredSelections[i + 1];
      const pathEdge = graphData.edges.find(
        (e) => e.from === fromId && e.to === toId && (e.condition ? e.condition(filteredSelections) : true)
      );
      if (pathEdge) edgesToRender.push(pathEdge);
    }

    // Add next possible edges
    const lastSelected = filteredSelections[filteredSelections.length - 1];
    const nextEdges = graphData.edges.filter(
      (e) => e.from === lastSelected && (e.condition ? e.condition(filteredSelections) : true)
    );
    edgesToRender.push(...nextEdges);

    return edgesToRender;
  };

  const edgesToRender = getEdgesToRender();
  const visibleColumns = (() => {
    const visible = new Set<number>([0]);

    // Add columns of selected nodes
    for (const nodeId of selectedNodes) {
      const node = graphData.nodes.find((n) => n.id === nodeId);
      if (node) visible.add(node.column);
    }

    // Add columns from edges
    for (const edge of edgesToRender) {
      const fromNode = graphData.nodes.find((n) => n.id === edge.from);
      const toNode = graphData.nodes.find((n) => n.id === edge.to);
      if (fromNode) visible.add(fromNode.column);
      if (toNode) visible.add(toNode.column);
    }

    return Array.from(visible).sort((a, b) => a - b);
  })();

  // Handle node clicks
  const handleNodeClick = (nodeId: string): void => {
    const node = graphData.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // Check if node is already selected
    if (selectedNodes.includes(nodeId)) {
      const index = selectedNodes.indexOf(nodeId);
      setSelectedNodes((prev) => prev.slice(0, index));
      return;
    }

    // First selection must be from column 0
    if (selectedNodes.length === 0) {
      if (node.column !== 0) return;
      setSelectedNodes([nodeId]);
      return;
    }

    // Check if this is a valid next selection
    const lastSelectedId = selectedNodes[selectedNodes.length - 1];
    const validNextEdges = graphData.edges.filter(
      (edge) => edge.from === lastSelectedId && (!edge.condition || edge.condition(selectedNodes))
    );
    const validNextIds = validNextEdges.map((e) => e.to);

    if (!validNextIds.includes(nodeId)) return;

    // Add new selection
    const currentColumn = node.column;
    setSelectedNodes((prev) => {
      const newSel = [...prev];
      newSel[currentColumn] = nodeId;
      return newSel.slice(0, currentColumn + 1);
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

      const isChosenPath = selectedNodes.some(
        (nodeId, index) => nodeId === edge.from && selectedNodes[index + 1] === edge.to
      );

      const fromPos = nodePositions[fromNode.id];
      const toPos = nodePositions[toNode.id];
      if (!fromPos || !toPos) return null;

      // Calculate vertical connection points
      const x1 = fromPos.left + fromPos.width / 2;
      const y1 = fromPos.top + fromPos.height;
      const x2 = toPos.left + toPos.width / 2;
      const y2 = toPos.top;

      // Draw curved path
      const midY = y1 + (y2 - y1) / 2;
      const pathD = `
        M ${x1} ${y1}
        C ${x1} ${midY},
          ${x2} ${midY},
          ${x2} ${y2}
      `;

      return (
        <path
          key={`${edge.from}->${edge.to}`}
          d={pathD}
          fill="none"
          stroke={isChosenPath ? '#3B82F6' : '#94A3B8'}
          strokeWidth={2}
          strokeDasharray="2 4"
        />
      );
    });
  };

  // Render rows (former columns)
  const renderRows = () => {
    const lastSelectedId = selectedNodes[selectedNodes.length - 1] || null;
    const validNextEdges = graphData.edges.filter((edge) => {
      if (edge.from !== lastSelectedId) return false;
      if (edge.condition && !edge.condition(selectedNodes)) return false;
      return true;
    });
    const validNextIds = validNextEdges.map((e) => e.to);

    return visibleColumns.map((col) => {
      const rowNodes = graphData.nodes.filter((n) => n.column === col);
      return (
        <div
          key={col}
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4"
        >
          {rowNodes.map((node) => {
            const isSelected = selectedNodes.includes(node.id);
            const isNextAvailable = (selectedNodes.length === 0 && node.column === 0) || validNextIds.includes(node.id);

            return (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                className={`
                  relative rounded-xl transition-all duration-200
                  bg-gray-100 dark:bg-gray-900 shadow-sm
                  flex items-center justify-between
                  ${isSelected ? 'border-2 border-blue-500 dark:border-blue-400' : 'border border-gray-200 dark:border-gray-700'}
                  ${!isSelected && !isNextAvailable ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <div className="flex-1 flex items-center p-4 cursor-pointer" onClick={() => handleNodeClick(node.id)}>
                  {/* Text */}
                  <div className="flex flex-col">
                    <div
                      className={`
                      text-sm font-medium
                      ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
                    `}
                    >
                      {node.typeLabel}
                    </div>
                    <div
                      className={`
                      text-base font-medium
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

                {/* Info button */}
                <button
                  onClick={() => setSelectedInfoNode(node)}
                  className="p-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Info size={20} />
                </button>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div>
      <ToastContainer />
      <RecommendHeader onReset={handleReset} onBack={handleBack} canGoBack={selectedNodes.length > 0} />

      <div
        ref={containerRef}
        className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-visible"
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
        <div className="flex flex-col space-y-8">
          {visibleColumns.map((col) => {
            const rowNodes = graphData.nodes.filter((n) => n.column === col);
            const lastSelectedId = selectedNodes[selectedNodes.length - 1] || null;
            const validNextEdges = graphData.edges.filter((edge) => {
              if (edge.from !== lastSelectedId) return false;
              if (edge.condition && !edge.condition(selectedNodes)) return false;
              return true;
            });
            const validNextIds = validNextEdges.map((e) => e.to);

            return (
              <div key={col} className="w-full space-y-5">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2">
                  <div className="flex justify-center gap-3">
                    {rowNodes.map((node) => {
                      const isSelected = selectedNodes.includes(node.id);
                      const isNextAvailable =
                        (selectedNodes.length === 0 && node.column === 0) || validNextIds.includes(node.id);

                      return (
                        <FlowchartNode
                          key={node.id}
                          node={node}
                          isSelected={isSelected}
                          isNextAvailable={isNextAvailable}
                          onSelect={() => handleNodeClick(node.id)}
                          onShowInfo={() => setSelectedInfoNode(node)}
                          nodeRef={(el) => {
                            nodeRefs.current[node.id] = el;
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileRecommendations selectedNodes={selectedNodes} />

      <NodeInfoModal
        isOpen={selectedInfoNode !== null}
        onClose={() => setSelectedInfoNode(null)}
        node={selectedInfoNode}
      />
    </div>
  );
};

export default MobileInteractiveFlowchart;
