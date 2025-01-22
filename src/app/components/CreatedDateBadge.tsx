import React from "react";
import { Calendar } from "lucide-react";

interface CreatedDateBadgeProps {
  date: string;
  className?: string;
}

const CreatedDateBadge = ({ date, className = "" }: CreatedDateBadgeProps) => {
  const formatDate = (dateStr: string) => {
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) {
      return dateStr;
    }
    return parsed.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className={`group inline-flex items-center gap-2 transition-all duration-300 ${className}`}
    >
      <div
        className="relative flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-4 py-2 
                    shadow-sm ring-1 ring-inset ring-blue-200/50 dark:ring-blue-700/50
                    hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:ring-blue-300 dark:hover:ring-blue-600"
      >
        <Calendar
          className="w-4 h-4 text-blue-500 dark:text-blue-400 
                         group-hover:text-blue-600 dark:group-hover:text-blue-300 
                         transition-colors duration-300"
        />
        <span
          className="ml-2 text-sm font-medium text-blue-700 dark:text-blue-200 
                      group-hover:text-blue-800 dark:group-hover:text-blue-100"
        >
          {formatDate(date)}
        </span>
      </div>
    </div>
  );
};

export default CreatedDateBadge;
