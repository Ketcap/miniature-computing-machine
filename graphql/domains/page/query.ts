import { nonNull, queryField, stringArg } from "nexus";

export const RetrievePage = queryField("retrievePage", {
  type: "Page",
  args: {
    page_id: nonNull(stringArg({ description: 'Identifier for a Notion page' }))
  },
  // @ts-ignore properties is missing + cover is having type issues working fine 👍
  resolve: async (_, args, ctx) => {
    return ctx.notion.pages.retrieve({
      page_id: args.page_id
    });
  }
})