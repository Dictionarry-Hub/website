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
  const data = await fetch(
    "https://raw.githubusercontent.com/Dictionarry-Hub/database/stable/bundles/wiki.json",
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return data.find((entry: any) => entry._id === "home") || null;
}
