import type { APIGatewayProxyEvent } from 'aws-lambda';
import { coremediaQuery } from '@src/coremedia-query';
import { articleTemplate } from '@src/templates';
import { terminus } from '@src/terminus';

export async function handler(event: APIGatewayProxyEvent, context: any) {
    const clientId = event.queryStringParameters?.clientid;
    if (!clientId || clientId !== process.env.CLIENT_ID) {
        return {
            statusCode: 404,
            body: 'Invalid request'
        };
    }

    const collectionId = event.pathParameters?.collectionid;
    if (!collectionId) {
        return {
            statusCode: 404,
            body: 'Collection ID required'
        };
    }

    try {
        const terminusResponse = await terminus.request(coremediaQuery(collectionId));
        const response = {
            isBase64Encoded: false,
            headers: {
                'Content-Type': 'text/html'
            },
            statusCode: 200,
            body: articleTemplate(terminusResponse)
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Could not find content'
        };
    }
}
