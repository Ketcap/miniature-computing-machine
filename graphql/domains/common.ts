import { enumType, interfaceType, objectType, unionType } from "nexus";

export const Emoji = objectType({
  name: 'Emoji',
  description: 'Emoji objects contain emoji data for page icons.',
  definition(t) {
    t.nonNull.string('type', { description: 'Type of page icon. Possible values are: "emoji".' });
    t.nonNull.string('emoji', { description: 'Emoji character. Ex: "🐶"' });
  }
});

export const FileType = enumType({
  name: 'FileType',
  description: 'Type of this file object.',
  members: ['external', 'file']
})

export const FileInterface = interfaceType({
  name: 'FileInterface',
  description: 'File objects contain data about files uploaded to Notion as well as external files linked in Notion. This interface used to create union objects, use ExternalFile, NotionFile instead.',
  resolveType: (file) => file.type === 'external' ? 'ExternalFile' : 'NotionFile',
  definition(t) {
    t.nonNull.field('type', { type: 'FileType', description: 'Type of file. Possible values are: "file", "external".' });
  }
});

export const ExternalFileObject = objectType({
  name: 'ExternalFileObject',
  definition(t) {
    t.nonNull.string('url', { description: 'Link to the externally hosted content. Ex:"https://website.domain/files/doc.txt"' });
  }
})

export const ExternalFile = objectType({
  name: 'ExternalFile',
  description: 'An external file is any URL that isn\'t hosted by Notion.',
  definition(t) {
    t.implements('FileInterface');
    t.nonNull.field('external', { type: 'ExternalFileObject' })
  }
});

export const NotionFile = objectType({
  name: 'NotionFile',
  description: 'All files hosted by Notion.',
  definition(t) {
    t.implements('FileInterface');
    t.nonNull.string('url', {
      description: 'Authenticated S3 URL to the file. The file URL will be valid for 1 hour but updated links can be requested if required. Ex: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9bc6c6e0-32b8-4d55-8c12-3ae931f43a01/brocolli.jpeg?...'
    });
    t.nonNull.string('expiry_time', {
      description: 'Date and time when this block was created. Formatted as an ISO 8601 date time string.	"2020-03-17T19:10:04.968Z"'
    });
  }
});

export const FileUnion = unionType({
  name: 'FileUnion',
  resolveType(file) {
    if (file.type === 'external') {
      return 'ExternalFile';
    }
    return "NotionFile"
  },
  definition(t) {
    t.members('ExternalFile', 'NotionFile');
  }
})

export const FileEmojiUnion = unionType({
  name: 'FileEmojiUnion',
  resolveType(file) {
    if (file.type === 'emoji') {
      return 'Emoji';
    }
    if (file.type === 'external') {
      return 'ExternalFile';
    }
    return "NotionFile"
  },
  definition(t) {
    t.members('ExternalFile', 'NotionFile', 'Emoji');
  }
});