// src/app/page.tsx
import { getVersion } from "@api/getData";

export default async function Home() {
  const { folders } = await getVersion();

  return (
    <div className="text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold">Dictionarry</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        A dictionary for arr apps - custom formats, profiles, and more
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Section cards for each folder */}
        {folders.map((folder) => (
          <div
            key={folder}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{folder}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
