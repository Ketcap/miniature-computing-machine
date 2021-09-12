import { objectType, unionType } from "nexus";

export const Page = objectType({
  name: 'Page',
  description: 'The Page object contains the property values of a single Notion page.',
  definition(t) {
    t.nonNull.string('object', {
      description: 'Always "page".'
    });
    t.nonNull.string('id', {
      description: 'Unique identifier of the page. Ex: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"'
    });
    t.nonNull.string('created_time', {
      description: 'Date and time when this page was created. Formatted as an ISO 8601 date time string. Ex: "2020-03-17T19:10:04.968Z"'
    });
    t.nonNull.string('last_edited_time', {
      description: 'Date and time when this page was created. Formatted as an ISO 8601 date time string. Ex: "2020-03-17T19:10:04.968Z"'
    });
    t.nonNull.boolean('archived', {
      description: 'The archived status of the page.'
    });

    t.field('icon', { type: 'FileEmojiUnion', description: 'Page icon.' });

    t.field('cover', { type: 'FileUnion', description: 'Page cover image.' });

    t.nonNull.string('url', { description: 'The URL of the Notion page.	Ex: "https://www.notion.so/Avocado-d093f1d200464ce78b36e58a3f0d8043"' })

    t.field('parent', { type: 'ParentUnion', description: 'The parent of this page.' });

    // t.field('properties', { type: 'Pro', description: 'Property values of this page.' });
  }
});

export const DatabaseParent = objectType({
  name: 'DatabaseParent',
  definition(t) {
    t.nonNull.string('type', { description: 'Always "database_id".	Ex:"database_id"' });
    t.nonNull.string('database_id', { description: 'The ID of the database that this page belongs to. Ex: "b8595b75-abd1-4cad-8dfe-f935a8ef57cb"' })
  }
});

export const PageParent = objectType({
  name: 'PageParent',
  definition(t) {
    t.nonNull.string('type', { description: 'Always "page_id".	Ex:"page_id"' });
    t.nonNull.string('page_id', { description: 'The ID of the page that this page belongs to. Ex: "b8595b75-abd1-4cad-8dfe-f935a8ef57cb"' })
  }
});

export const WorkspaceParent = objectType({
  name: 'WorkspaceParent',
  definition(t) {
    t.nonNull.string('type', { description: 'Always "workspace".	Ex:"workspace"' });
    t.nonNull.boolean('workspace', { description: 'Always true.' })
  }
});

export const ParentUnion = unionType({
  name: 'ParentUnion',
  description: 'The parent of this page. Can be a database, page, or workspace.',
  resolveType(parent) {
    if (parent.type === 'database_id') {
      return 'DatabaseParent';
    }
    if (parent.type === 'page_id') {
      return 'PageParent';
    }
    return 'WorkspaceParent';
  },
  definition(t) {
    t.members('DatabaseParent', 'PageParent', 'WorkspaceParent')
  }
});