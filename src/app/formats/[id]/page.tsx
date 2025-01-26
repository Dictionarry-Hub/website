import { getContent } from "@api/getData";
import { FormatNavigation } from "../components/FormatNavigation";
import { FormatDisplay } from "../components/FormatDisplay";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  params: Promise<{ id: string }>;
}

const createUrlSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-").trim();
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const customFormats = (await getContent("custom_formats")) as
    | CustomFormatEntry[]
    | null;

  if (!customFormats) {
    return {
      title: "Format Not Found | Dictionarry",
      description: "The requested format could not be found.",
    };
  }

  const decodedSlug = decodeURIComponent(id);
  const selectedFormat = customFormats.find(
    (format) => createUrlSlug(format.name) === decodedSlug
  );

  if (!selectedFormat) {
    return {
      title: "Format Not Found | Dictionarry",
      description: "The requested format could not be found.",
    };
  }

  return {
    title: `${selectedFormat.name} | Dictionarry`,
    description:
      selectedFormat.description ||
      `Configuration details for ${selectedFormat.name}`,
  };
}

export default async function FormatPage({ params }: PageProps) {
  const { id } = await params;
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

  const decodedSlug = decodeURIComponent(id);
  const selectedFormat = customFormats.find(
    (format) => createUrlSlug(format.name) === decodedSlug
  );

  if (!selectedFormat) {
    notFound();
  }

  return (
    <div className="container mx-auto flex flex-col box-border h-full">
      <div className="flex gap-8 flex-1 min-h-0">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-0">
            <FormatDisplay format={selectedFormat} />
          </div>
        </main>
        <aside className="w-[350px] overflow-y-auto">
          <FormatNavigation
            formats={customFormats}
            selectedId={selectedFormat._id}
          />
        </aside>
      </div>
    </div>
  );
}
