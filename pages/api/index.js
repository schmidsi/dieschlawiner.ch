import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    isValidCode(query: String): Boolean
    search: String
  }
`;

const resolvers = {
  Query: {
    async search(parent, args, context) {
      // const result = await fetch(
      //   `http://solr.unchained.rocks/solr/veloplus/query`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       query: args.query,
      //       facet: {
      //         categories: {
      //           type: "terms",
      //           field: "allAssortments_ss"
      //         }
      //       }}),
      //     headers: { 'Content-Type': 'application/json' },
      //   },
      // ).then(response => response.json());
      return process.env.TEST;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api' });
