import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest } from 'next';
import { schema } from '../../graphql/schema';
import { getNotionClient } from '../../utils/notion';

const introspectionQueryName = 'IntrospectionQuery'

const server = new ApolloServer({
  schema,
  context: ({ req }:{req:NextApiRequest}) => {
    const { authorization } = req.headers;

    if(!authorization){
      return {};
      // throw new Error('Missing Header: Authorization')
    }

    return {
      notion: getNotionClient(authorization)
    }
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api/graphql',
})