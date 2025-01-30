import React from 'react';
import { columnInfo, getRecommendations } from '@/data/profileInfoData';
import { QualityProfileData } from '@/data/flowchartData';

interface FlowchartInfoProps {
  selectedNodes: string[];
  hoveredNodeId: string | null;
}

const FlowchartInfo: React.FC<FlowchartInfoProps> = ({ selectedNodes, hoveredNodeId }) => {
  const getEdgesToRender = () => {
    const filteredSelections = selectedNodes.filter(Boolean);
    if (filteredSelections.length === 0) return [];

    const edges = [];

    // Add edges for chosen path
    for (let i = 0; i < filteredSelections.length - 1; i++) {
      const fromId = filteredSelections[i];
      const toId = filteredSelections[i + 1];
      const pathEdge = QualityProfileData.edges.find(
        (e) => e.from === fromId && e.to === toId && (e.condition ? e.condition(filteredSelections) : true)
      );
      if (pathEdge) edges.push(pathEdge);
    }

    // Add next possible edges
    const lastSelected = filteredSelections[filteredSelections.length - 1];
    const nextEdges = QualityProfileData.edges.filter(
      (e) => e.from === lastSelected && (e.condition ? e.condition(filteredSelections) : true)
    );
    edges.push(...nextEdges);

    return edges;
  };

  const getVisibleColumns = (edgesToRender: typeof QualityProfileData.edges) => {
    const filteredSelections = selectedNodes.filter(Boolean);
    const visible = new Set<number>([0]); // always show col 0

    // Add columns of selected nodes
    for (const selId of filteredSelections) {
      const node = QualityProfileData.nodes.find((n) => n.id === selId);
      if (node) visible.add(node.column);
    }

    // Add columns from edges
    for (const edge of edgesToRender) {
      const fromNode = QualityProfileData.nodes.find((n) => n.id === edge.from);
      const toNode = QualityProfileData.nodes.find((n) => n.id === edge.to);
      if (fromNode) visible.add(fromNode.column);
      if (toNode) visible.add(toNode.column);
    }

    return Array.from(visible).sort((a, b) => a - b);
  };

  const getCurrentColumnNodes = () => {
    const edges = getEdgesToRender();
    const visibleColumns = getVisibleColumns(edges);
    const currentColumn = visibleColumns[visibleColumns.length - 1];
    return QualityProfileData.nodes.filter((n) => n.column === currentColumn);
  };

  const currentColumnNodes = getCurrentColumnNodes();
  const recommendations = getRecommendations(selectedNodes);

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {/* Information Section */}
      <div className="col-span-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg pl-2 font-semibold text-gray-900 dark:text-white">Information</h3>

        {/* Column Info */}
        <div className="mt-4">
          <p className="pl-2 text-gray-600 dark:text-gray-300">{columnInfo[currentColumnNodes[0]?.column || 0].info}</p>
        </div>

        <div className="px-2 my-4">
          <hr className="border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* Node Options */}
        <div>
          <ul>
            {currentColumnNodes.map((node) => (
              <li
                key={node.id}
                className={`
                  mb-2 p-2 rounded-md transition-colors duration-200
                  ${
                    hoveredNodeId === node.id
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                  }
                `}
              >
                <span
                  className={`
                    font-semibold mr-2
                    ${
                      hoveredNodeId === node.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }
                  `}
                >
                  {node.label}:
                </span>
                <span className="text-gray-600 dark:text-gray-300">{columnInfo[node.column].nodes[node.id].info}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="col-span-2 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
        <div>{recommendations}</div>
      </div>
    </div>
  );
};

export default FlowchartInfo;
