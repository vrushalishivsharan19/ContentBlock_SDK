import type { APIGatewayProxyEvent } from 'aws-lambda';
import { coremediaQuery } from '@src/coremedia-query';
import { handler } from '@src/index';
import { terminus } from '@src/terminus';

jest.mock('@src/terminus');
const mockedTerminus = terminus as jest.Mocked<typeof terminus>;

describe('SFMC Template Composer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('Returns a 404 when there are no query string parameters', async () => {
        // GIVEN
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: null
        } as any;

        // WHEN
        const output = await handler(mockEvent, {});

        // THEN
        expect(terminus.request).toHaveBeenCalledTimes(0);
        expect(output.statusCode).toEqual(404);
        expect(output.body).toContain('Invalid request');
    });

    test('Returns a 404 when client id does not match', async () => {
        // GIVEN
        process.env.CLIENT_ID = 'top_secret';
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                clientid: 'iamahacker'
            }
        } as any;

        // WHEN
        const output = await handler(mockEvent, {});

        // THEN
        expect(terminus.request).toHaveBeenCalledTimes(0);
        expect(output.statusCode).toEqual(404);
        expect(output.body).toContain('Invalid request');
    });

    test('Returns a 404 when collection id not provided', async () => {
        // GIVEN
        process.env.CLIENT_ID = 'top_secret';
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                clientid: 'top_secret'
            }
        } as any;

        // WHEN
        const output = await handler(mockEvent, {});

        // THEN
        expect(terminus.request).toHaveBeenCalledTimes(0);
        expect(output.statusCode).toEqual(404);
        expect(output.body).toContain('Collection ID required');
    });

    test('Returns a 500 when there is a content error', async () => {
        // GIVEN
        process.env.CLIENT_ID = 'top_secret';
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                clientid: 'top_secret'
            },
            pathParameters: {
                collectionid: 1234
            }
        } as any;
        mockedTerminus.request.mockResolvedValue({
            error: 'fatal'
        });

        // WHEN
        const output = await handler(mockEvent, {});

        // THEN
        expect(terminus.request).toHaveBeenCalledTimes(1);
        expect(output.statusCode).toEqual(500);
        expect(output.body).toContain('Could not find content');
    });

    test('Returns a rendered output when a terminus response is found', async () => {
        // GIVEN
        const collectionId = '1234';
        process.env.CLIENT_ID = 'top_secret';
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                clientid: 'top_secret'
            },
            pathParameters: {
                collectionid: collectionId
            }
        } as any;
        mockedTerminus.request.mockResolvedValue({
            CoremediaCollection: {
                items: [
                    {
                        shortTeaserTitle: 'this is a short teaser title',
                        teaserText: { plainText: 'this is plain text' },
                        featuredMedia: []
                    }
                ]
            }
        });

        // WHEN
        const output = await handler(mockEvent, {});
        const query = coremediaQuery(collectionId);

        // THEN
        expect(terminus.request).toHaveBeenCalledWith(query);
        expect(output.statusCode).toEqual(200);
        expect(output.body).toContain('this is a short teaser title');
        expect(output.body).toContain('this is plain text');
    });

    test('Returns a rendered output without line breaks and encoded quotes', async () => {
        // GIVEN
        const collectionId = '1234';
        process.env.CLIENT_ID = 'top_secret';
        const mockEvent: APIGatewayProxyEvent = {
            queryStringParameters: {
                clientid: 'top_secret'
            },
            pathParameters: {
                collectionid: collectionId
            }
        } as any;
        mockedTerminus.request.mockResolvedValue({
            CoremediaCollection: {
                items: [
                    {
                        shortTeaserTitle: 'this is a short teaser title',
                        teaserText: { plainText: 'this is plain text' },
                        featuredMedia: []
                    }
                ]
            }
        });

        // WHEN
        const output = await handler(mockEvent, {});
        const query = coremediaQuery(collectionId);

        // THEN
        expect(output.statusCode).toEqual(200);
        expect(output.body).not.toContain('\n');
        expect(output.body).not.toContain('"');
    });
});
