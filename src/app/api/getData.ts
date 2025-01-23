// src/app/utils/getData.ts

export async function getVersion() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/version.json",
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch version: ${response.status}`);
    }

    const version = await response.json();
    return version;
  } catch (error) {
    console.error("Error fetching version:", error);
    return null;
  }
}

export async function getContent(type: string) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/${type}.json`,
      {
        next: { revalidate: 60 },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} content: ${response.status}`);
    }

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      console.error(`Error parsing ${type} JSON:`, parseError);
      console.error("Raw response:", text.slice(0, 200));
      throw new Error(`Invalid JSON in ${type} response`);
    }
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return null;
  }
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

    interface WikiEntry {
      _id: string;
      content?: string;
      author?: string;
      last_modified?: string;
    }

    const homeEntry = data.find((entry: WikiEntry) => entry._id === "home");

    if (!homeEntry) {
      return null;
    }

    return {
      id: homeEntry._id,
      content: homeEntry.content || "",
      author: homeEntry.author || "Unknown",
      last_modified: homeEntry.last_modified || null,
    };
  } catch (error) {
    console.error("Error fetching home content:", error);
    return null;
  }
}
