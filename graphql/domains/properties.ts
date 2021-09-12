import { enumType, interfaceType} from "nexus";

export const PropertyType = enumType({
  name: 'PropertyType',
  members: {
    "rich_text": 'rich_text',
    "number": 'number',
    "select": 'select',
    "multi_select": 'multi_select',
    "date": 'date',
    "formula": 'formula',
    "relation": 'relation',
    "rollup": 'rollup',
    "title": 'title',
    "people": 'people',
    "files": 'files',
    "checkbox": 'checkbox',
    "url": 'url',
    "email": 'email',
    "phone_number": 'phone_number',
    "created_time": 'created_time',
    "created_by": 'created_by',
    "last_edited_time": 'last_edited_time',
    "last_edited_by": 'last_edited_by'
  }
});


// export const PropertyInterface = interfaceType({
//   name: 'PropertyInterface',
//   resolveType: (property) => property.type,
//   definition(t) {
//     t.nonNull.string('id', {
//       description: 'Underlying identifier for the property. This identifier is guaranteed to remain constant when the property name changes. It may be a UUID, but is often a short random string. The id may be used in place of name when creating or updating pages.'
//     });
//     t.nonNull.field('type', { type: 'PropertyType', description: 'Type of the property' });
//   }
// });

// export const 
