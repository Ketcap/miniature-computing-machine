import { Client as NotionClient } from "@notionhq/client";

export const getNotionClient = (auth: string): NotionClient => {
  const notion = new NotionClient({
    auth,
  });

  return notion;
}