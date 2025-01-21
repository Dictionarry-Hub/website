// src/app/utils/getData.ts
export async function getVersion() {
  const version = await fetch(
    "https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/version.json",
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return version;
}

export async function getContent(type: string) {
  const data = await fetch(
    `https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/${type}.json`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return data;
}

export async function getHomeContent() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/wiki.json",
      {
        next: {
          revalidate: 60,
        },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    const homeEntry = data.find((entry: any) => entry._id === "home");

    if (!homeEntry) {
      return null;
    }

    return {
      _id: homeEntry._id,
      content: homeEntry.content || "",
      author: homeEntry.author || "Unknown",
      last_modified: homeEntry.last_modified || null,
    };
  } catch (error) {
    console.error("Error fetching home content:", error);
    return null;
  }
}
