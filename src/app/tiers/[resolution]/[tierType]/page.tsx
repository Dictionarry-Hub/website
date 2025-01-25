// app/tiers/[resolution]/[tierType]/page.tsx
import { getReleaseGroupTiers } from "@api/getData";
import { Star, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { type Metadata } from "next";

type Params = {
  resolution: string;
  tierType: "quality" | "efficient";
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `${params.resolution.toUpperCase()} ${
      params.tierType
    } Tiers | Dictionarry`,
    description: `Detailed ${params.tierType} tier rankings for ${params.resolution} release groups`,
  };
}

export default async function TierPage({ params }: { params: Params }) {
  // Direct destructuring
  const { resolution, tierType } = params;

  // Existing implementation
  const tiersData = await getReleaseGroupTiers();
  const resolutionTiers = tiersData?.resolutions[resolution]?.[tierType];
  // Color configuration
  const colorStyles = {
    quality: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      badgeBg: "bg-blue-100/70 dark:bg-blue-900/30",
    },
    efficient: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      badgeBg: "bg-green-100/70 dark:bg-green-900/30",
    },
  };

  const currentColor = colorStyles[tierType];

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${currentColor.bg} rounded-lg`}>
              {tierType === "quality" ? (
                <Star className={`w-6 h-6 ${currentColor.text}`} />
              ) : (
                <Zap className={`w-6 h-6 ${currentColor.text}`} />
              )}
            </div>
            <h1 className="text-3xl font-bold">
              {resolution}{" "}
              {tierType.charAt(0).toUpperCase() + tierType.slice(1)} Tiers
            </h1>
          </div>
          <Link
            href="/tiers"
            className={`flex items-center gap-2 text-sm ${currentColor.text} hover:underline`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Tiers
          </Link>
        </div>

        {/* Content Section */}
        {!resolutionTiers ? (
          <div className="flex flex-col items-center justify-center gap-6 pt-8">
            <div className="text-center">
              <Image
                src="/gifs/hammer-construction.gif"
                alt="Construction"
                width={500}
                height={500}
                className="object-contain opacity-80 mb-4"
                priority
              />
              <p className="text-gray-600 dark:text-gray-300">
                This tier list is still under construction, check back later!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {resolutionTiers.map((tier) => {
              const groups = tier.conditions
                .flatMap(
                  (condition) =>
                    condition.pattern?.replace(/^\^|\$/g, "").split("|") || []
                )
                .filter(Boolean);

              const uniqueGroups = [...new Set(groups)];
              const tierName =
                `${resolution} ${tierType} Tier ${tier.tierNumber}`
                  .toLowerCase()
                  .replace(/\s+/g, "-");

              return (
                <div
                  key={tier._id}
                  className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/90 dark:to-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-semibold">
                        Tier {tier.tierNumber}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/formats/${tierName}`}
                          className={`flex items-center gap-1 px-3 py-1 ${currentColor.bg} ${currentColor.text} rounded-lg hover:opacity-80 transition-opacity text-sm`}
                        >
                          <span>Custom Format</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            {uniqueGroups.length} Groups
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueGroups.map((group) => (
                        <span
                          key={group}
                          className={`px-3 py-1.5 ${currentColor.badgeBg} ${currentColor.text} rounded-full text-sm font-medium`}
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
