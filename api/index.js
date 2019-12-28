import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import { google } from 'googleapis';
import ConstraintDirective from 'graphql-constraint-directive';

const CACHE_TIMEOUT = 100 * 1000;

const cache = {};

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

auth.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  expiry_date: process.env.GOOGLE_TOKEN_EXPIRY_DATE,
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  token_type: 'Bearer',
});

const sheets = google.sheets({ version: 'v4', auth });

const getEntries = async forceRefetch => {
  const now = new Date();

  if (
    !forceRefetch &&
    cache.entries &&
    now - cache.entries.timestamp < CACHE_TIMEOUT
  ) {
    return cache.entries.data;
  }

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '1LW3jwZED2ivelmt-VqrweqbEH3mN-okbLGQjO5X_qmE',
    range: 'A:Z',
    auth,
  });

  const entries = result.data.values.reduce(
    (acc, curr, index, self) =>
      index === 0
        ? acc
        : [
            ...acc,
            {
              row: index + 1,
              ...Object.fromEntries(
                self[0].map((key, i) => [key.trim(), curr[i]]),
              ),
            },
          ],
    [],
  );

  cache.entries = {
    timestamp: new Date(),
    data: entries,
  };

  return entries;
};

const typeDefs = gql`
  scalar ConstraintString
  scalar ConstraintNumber

  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

  type Query {
    isValidCode(code: String!): Boolean
    greeting(code: String!): String
    test: String
  }

  type Mutation {
    register(code: String!, input: RegisterInput!): Boolean
  }

  input RegisterInput {
    vorname: String! @constraint(maxLength: 30)
    nachname: String! @constraint(maxLength: 30)
    adresse: String! @constraint(maxLength: 30)
    plz: String! @constraint(pattern: "^[0-9]{4,6}$")
    ort: String! @constraint(maxLength: 30)
    mobile: String! @constraint(maxLength: 30)
    email: String! @constraint(format: "email")
  }
`;

const resolvers = {
  Query: {
    async test(parent, args, context) {
      return process.env.TEST;
    },
    async isValidCode(_, { code }) {
      const entries = await getEntries();

      const entry = entries.find(e => e['code'] === code.trim().toLowerCase());

      return !!(entry && !entry['Timestamp']);
    },
    async greeting(_, { code }) {
      const entries = await getEntries();

      const entry = entries.find(e => e['code'] === code.trim().toLowerCase());

      if (entry) return entry['begruessung'];
      return '';
    },
  },
  Mutation: {
    async register(_, { code, input }) {
      const entries = await getEntries();

      console.log(code, input, entries);

      return true;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: { constraint: ConstraintDirective },
});

const apolloServer = new ApolloServer({
  schema,
  formatError: error => {
    console.log(error);
    return error;
  },
});

export default apolloServer;
