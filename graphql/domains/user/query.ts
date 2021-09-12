import { intArg, nonNull, objectType, queryField, stringArg, unionType } from "nexus";


export const UserResultUnion = unionType({
  name: 'UserResultUnion',
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
    t.list.field("results", { type: "UserResultUnion" });
    t.string('next_cursor');
    t.boolean('has_more');
  }
});

export const ListAllUsers = queryField('listAllUsers', {
  type: 'ListAllUsersResponse',
  args: {
    start_cursor: stringArg({ description: 'If supplied, this endpoint will return a page of results starting after the cursor provided. If not supplied, this endpoint will return the first page of results.' }),
    page_size: intArg({ description: 'The number of items from the full list desired in the response. Maximum: 100' })
  },
  resolve: async (parent, args, ctx) => {
    const response = await ctx.notion.users.list();

    return {
      results: response.results,
      next_cursor: response.next_cursor,
      has_more: response.has_more
    }
  }
})

export const RetrieveUser = queryField('retrieveUser', {
  type: 'UserResultUnion',
  args: {
    user_id: nonNull(stringArg({ description: 'Identifier for a Notion user' }))
  },
  // @ts-ignore return type is same with the output only missing part is extra field like person.email
  resolve: async (parent, args, ctx) => {
    return ctx.notion.users.retrieve({ user_id: args.user_id });
  }
})