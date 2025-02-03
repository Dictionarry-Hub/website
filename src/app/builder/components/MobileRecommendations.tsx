import React from 'react';
import { getRecommendations } from '@/data/profileInfoData';

interface MobileRecommendationsProps {
  selectedNodes: string[];
}

const MobileRecommendations: React.FC<MobileRecommendationsProps> = ({ selectedNodes }) => {
  const recommendations = getRecommendations(selectedNodes);
  if (!recommendations) return null;

  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recommendations</h3>
      <div className="text-sm text-gray-600 dark:text-gray-300">{recommendations}</div>
    </div>
  );
};

export default MobileRecommendations;
