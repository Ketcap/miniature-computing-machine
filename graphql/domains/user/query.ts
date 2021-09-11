import { objectType, queryField, unionType } from "nexus";


export const ListUserResultUnion = unionType({
  name: 'ListUserResultUnion',
  resolveType(data) {
    if (data.type === 'person') {
      return 'People';
    }
    return "Bots"
  },
  definition(t) {
    t.members('People', 'Bots');
  }
});

export const ListAllUsersResponse = objectType({
  name: "ListAllUsersResponse",
  definition(t) {
    t.list.field("results", { type: "ListUserResultUnion" });
    t.string('next_cursor');
    t.boolean('has_more');
  }
});

export const ListAllUsers = queryField('listAllUsers', {
  type: 'ListAllUsersResponse',
  resolve: async (parent, args, ctx) => {

    const response = await ctx.notion.users.list();

    return {
      results: response.results,
      next_cursor: response.next_cursor,
      has_more: response.has_more
    }
  }
})