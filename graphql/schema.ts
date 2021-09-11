import { makeSchema, queryType } from 'nexus';
import path from 'path';

import * as types from './domains';

export const schema = makeSchema({
  types,
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/../node_modules/@types/nexus-typegen/index.d.ts`,
  },
  contextType: {
    module: path.join(process.cwd(),'graphql','types.ts'),
    export: 'Context',
  },
  shouldExitAfterGenerateArtifacts: process.argv.includes('--nexus-exit'),
})

