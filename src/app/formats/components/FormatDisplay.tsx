// src/app/formats/components/FormatDisplay.tsx
import { Box } from "lucide-react";

interface CustomFormat {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
}

interface FormatDisplayProps {
  format?: CustomFormat;
}

export function FormatDisplay({ format }: FormatDisplayProps) {
  if (!format) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <Box className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">
            Select a format to view its details
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{format.name}</h1>
      {/* Placeholder for future content */}
    </div>
  );
}
