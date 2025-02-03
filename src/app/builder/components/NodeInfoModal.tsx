import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { columnInfo } from '@/data/profileInfoData';
import { nodeTypeToIcon } from '@/data/flowchartData';

interface Node {
  id: string;
  label: string;
  column: number;
  type: keyof typeof nodeTypeToIcon;
  typeLabel: string;
}

interface NodeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: Node | null;
}

const NodeInfoModal: React.FC<NodeInfoModalProps> = ({ isOpen, onClose, node }) => {
  if (!node) return null;

  const Icon = nodeTypeToIcon[node.type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <div className="flex items-baseline">
                <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {node.label}
                </DialogTitle>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{node.typeLabel}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 space-y-4">
          <p>{columnInfo[node.column].nodes[node.id].info}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">Tap anywhere outside to close</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeInfoModal;
