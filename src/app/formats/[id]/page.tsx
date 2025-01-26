// src/app/formats/[id]/page.tsx
import { getContent } from "@api/getData";
import { FormatNavigation } from "../components/FormatNavigation";
import { FormatDisplay } from "../components/FormatDisplay";
import { notFound } from "next/navigation";

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

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FormatPage({ params }: PageProps) {
  const customFormats = (await getContent("custom_formats")) as
    | CustomFormatEntry[]
    | null;

  if (!customFormats) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">
          Failed to load custom formats. Please try again later.
        </p>
      </div>
    );
  }

  // Decode the URL parameter
  const decodedId = decodeURIComponent(params.id);
  const selectedFormat = customFormats.find(
    (format) => format._id === decodedId
  );

  if (!selectedFormat) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3">
          <div className="sticky top-24">
            <FormatNavigation formats={customFormats} selectedId={decodedId} />
          </div>
        </aside>
        <main className="col-span-12 lg:col-span-9">
          <FormatDisplay format={selectedFormat} />
        </main>
      </div>
    </div>
  );
}
