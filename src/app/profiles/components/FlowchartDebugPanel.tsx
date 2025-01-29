'use client';

import React from 'react';

interface DebugPanelProps {
  selectedNodes: string[];
  graphData: {
    nodes: {
      id: string;
      label: string;
      column: number;
    }[];
  };
}

const FlowchartDebugPanel: React.FC<DebugPanelProps> = ({ selectedNodes, graphData }) => {
  const getNodeInfo = (nodeId: string) => {
    const node = graphData.nodes.find((n) => n.id === nodeId);
    return node ? { label: node.label, column: node.column } : { label: 'Unknown', column: -1 };
  };

  const currentColumn = selectedNodes.length;

  return (
    <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Debug Panel</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Current Column:</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{currentColumn}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Selected Path:</h3>
          {selectedNodes.length > 0 ? (
            <div className="mt-2 space-y-2">
              {selectedNodes.map((nodeId, index) => {
                const nodeInfo = getNodeInfo(nodeId);
                return (
                  // The only change: add `-${index}` to ensure the key is unique
                  <div key={`${nodeId}-${index}`} className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-900">{nodeInfo.label}</span>
                    <span className="text-gray-500 text-sm">(Column: {nodeInfo.column + 1})</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No nodes selected</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Selection Count:</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{selectedNodes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default FlowchartDebugPanel;
