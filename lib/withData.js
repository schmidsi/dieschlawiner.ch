import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';

const config = {
  link: new HttpLink({
    credentials: 'same-origin',
    uri: '/api',
  }),
};

export default withData(config);
