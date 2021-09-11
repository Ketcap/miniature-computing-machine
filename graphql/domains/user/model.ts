import { enumType, interfaceType, objectType, } from "nexus";

export const UserType = enumType({
  name: "UserType",
  description: 'Type of the user.',
  members: ["person", 'bot']
})

export const UserInterface = interfaceType({
  name: "UserInterface",
  resolveType: (user) => user.type === 'person' ? 'People' : 'Bots',
  definition(t) {
    t.nonNull.string('id', {
      description: 'Unique identifier for this user. Ex: e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
    });
    t.nonNull.string('object', {
      description: 'Always "user"'
    });
    t.field('type', { type: 'UserType' });

    t.string('name', {
      description: 'User\'s name, as displayed in Notion. Ex:"Avocado Lovelace"'
    });

    t.string('avatar_url', {
      description: 'Chosen avatar image. Ex: "https://secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d.jpg"'
    });
  }
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.implements('UserInterface');
  }
})

export const PersonObject = objectType({
  name: 'PersonObject',
  description: 'User objects that represent people have the type property set to "person".',
  definition(t) {
    t.nonNull.string('email', { description: 'Email address of person. Ex: "avo@example.org"' })
  }
});

export const People = objectType({
  name: "People",
  definition(t) {
    t.implements('UserInterface');
    t.field('person', { type: 'PersonObject', description: 'Properties only present for non-bot users.' })
  }
});

export const Bots = objectType({
  name: 'Bots',
  description: 'User objects that represent bots have the type property set to "bot".',
  definition(t) {
    t.implements('UserInterface');
  }
})