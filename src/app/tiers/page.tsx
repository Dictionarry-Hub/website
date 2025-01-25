import { getReleaseGroupTiers } from "@api/getData";
import { Box, Star, Zap, Info } from "lucide-react";
import ResolutionCard from "./components/ResolutionCard";

export const metadata = {
  title: "Release Group Tiers | Dictionarry",
  description:
    "Release group quality and efficiency tiers for media automation",
};

export default async function Page() {
  const tiers = await getReleaseGroupTiers();

  return (
    <div className="container mx-auto px-4">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Box className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          <h1 className="text-3xl font-bold">Release Group Tiers</h1>
        </div>
      </header>

      <section className="grid gap-6 mb-12">
        <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold">How It Works</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Dictionarry ranks release groups based on their historical
              performance to automate subjective release analysis. Rather than
              relying on technical specifications alone, we use data-driven
              metrics (GPPi and EEi) to evaluate how groups consistently perform
              in two areas: <strong>Quality and Efficiency</strong>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Quality Tiers</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ranks groups based on their audiovisual quality, primarily using
                GPPi data, with EEi as a fallback for approximating VMAF
                transparency when needed
              </p>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium">Efficiency Tiers</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Evaluates groups based on their ability to maintain quality
                while optimizing file size, measured through the Encode
                Efficiency Index (EEi)
              </p>
            </div>
          </div>
        </div>
      </section>

      {tiers ? (
        <div className="grid gap-6">
          {Object.entries(tiers.resolutions)
            .sort(([a], [b]) => {
              const order = { "2160p": 0, "1080p": 1, "720p": 2, SD: 3 };
              return (
                order[a as keyof typeof order] - order[b as keyof typeof order]
              );
            })
            .map(([resolution, types]) => (
              <ResolutionCard
                key={resolution}
                resolution={resolution}
                Quality={types.quality}
                Efficient={types.efficient}
              />
            ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">
            Failed to load release group tiers. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
