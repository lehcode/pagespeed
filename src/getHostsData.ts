/**
 * @author Anton Repin
 */
import axios from 'axios';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpResponse, HttpResponseItem, PagespeedResponse } from './types';
import * as hosts from './hosts.json';

const urls = hosts.urls.sort();
const endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const API_KEY = process.env.PAGESPEED_API_KEY;

export function JSONResponse(body: HttpResponseItem[] | PagespeedResponse, statusCode: number): HttpResponse {
  return {
    // @ts-ignore
    body: JSON.stringify([
      {
        statusCode,
        body: JSON.stringify(body) as string,
      },
    ]) as string,
    isBase64Encoded: false,
    statusCode: 200,
  };
}

export async function handler(event: APIGatewayProxyEvent): HttpResponse {
  const responseData: HttpResponseItem[] = [];

  for (const url of urls) {
    const { data } = await axios.get<PagespeedResponse>(endpoint, {
      params: { key: API_KEY, url: url },
    });

    if (data.hasOwnProperty('errors')) {
      return JSONResponse(data, 200);
    } else {
      if (data.hasOwnProperty('lighthouseResult') && !!data.lighthouseResult) {
        responseData.push({
          title: data.lighthouseResult.audits['speed-index'].title,
          score: Math.round(data.lighthouseResult.audits['speed-index'].score * 100),
          url: url,
        });
      }
    }
  }

  // @ts-ignore
  return JSONResponse(responseData, 200);
}
