import { config } from 'dotenv';
import { GraphQLClient } from 'graphql-request';

config();

export const terminus = new GraphQLClient(`${process.env.TERMINUS_URL}`, {
    headers: {
        'x-api-key': `${process.env.TERMINUS_KEY}`
    }
});
