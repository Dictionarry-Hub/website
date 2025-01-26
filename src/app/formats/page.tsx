// src/app/formats/page.tsx
import { getContent } from "@api/getData";
import { FormatNavigation } from "./components/FormatNavigation";
import { FormatDisplay } from "./components/FormatDisplay";

interface CustomFormatEntry {
  _id: string;
  name: string;
  description?: string;
  conditions: Array<{
    name: string;
    negate: boolean;
    required: boolean;
    type: string;
    pattern?: string;
    source?: string;
    resolution?: string;
  }>;
  tags?: string[];
}

export const metadata = {
  title: "Custom Formats | Dictionarry",
  description: "Custom format configurations for media automation",
};

export default async function FormatsPage() {
  const customFormats = (await getContent("custom_formats")) as
    | CustomFormatEntry[]
    | null;

  if (!customFormats) {
    return (
      <div className="container mx-auto">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">
            Failed to load custom formats. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-12 lg:col-span-9">
          <FormatDisplay />
        </main>
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-24">
            <FormatNavigation formats={customFormats} />
          </div>
        </aside>
      </div>
    </div>
  );
}
