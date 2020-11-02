/**
 * @author Anton Repin
 */
import axios from 'axios';
import { pagespeedSuccessResponse } from './mocks/pagespeedSuccessResponse';
import { HttpResponseItem, PagespeedErrorResponse } from '../types';
import { pagespeedErrorResponse } from './mocks/pagespeedErrorResponse';
import { httpEventMock } from './mocks/httpEventMock';
import { handler, JSONResponse } from '../getHostsData';
import * as hosts from '../hosts.json';

const urls = hosts.urls.sort();
const defaultEvent = {
  ...httpEventMock,
} as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Hosts data handler', () => {
  it('should respond with hosts JSON', async () => {
    const requestSpy = jest.spyOn(axios, 'get').mockImplementation(async () => ({ data: pagespeedSuccessResponse }));

    const responseItem: HttpResponseItem[] = [
      {
        title: 'Speed Index',
        score: 49,
        url: urls[0],
      },
      {
        title: 'Speed Index',
        score: 49,
        url: urls[1],
      },
      {
        title: 'Speed Index',
        score: 49,
        url: urls[2],
      },
    ];

    const actual = await handler(defaultEvent);
    const expected = JSONResponse(responseItem, 200);

    expect(actual).toEqual(expected);
    expect(requestSpy).toHaveBeenCalled();
  });

  it('should issue an error if PageSpeed API responds with error', async () => {
    const requestSpy = jest.spyOn(axios, 'get').mockImplementation(async () => ({ data: pagespeedErrorResponse }));
    const errorResponseMock: PagespeedErrorResponse = {
      success: false,
      code: 429,
      errors: [
        {
          message:
            "Quota exceeded for quota group 'default' and limit 'Queries per 100 seconds' of service 'pagespeedonline.googleapis.com' for consumer 'project_number:583797351490'.",
          domain: 'global',
          reason: 'rateLimitExceeded',
        },
      ],
      status: 'RESOURCE_EXHAUSTED',
    };

    const actual = await handler(defaultEvent);
    const expected = JSONResponse(errorResponseMock, 200);

    expect(actual).toEqual(expected);
    expect(requestSpy).toHaveBeenCalled();
  });
});
