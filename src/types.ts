/**
 * @author Anton Repin
 */

import { APIGatewayProxyResult } from 'aws-lambda';

export type HttpResponse = Promise<APIGatewayProxyResult>;

export type HttpResponseItem = {
  title: string;
  score: number;
  url: string;
  errors?: Record<string, unknown>[];
};

type LighthouseResult = {
  requestedUrl: string;
  finalUrl: string;
  lighthouseVersion: string;
  userAgent: string;
  fetchTime: string;
  environment: Record<string, any>;
  runWarnings: Record<string, any>[];
  configSettings: Record<string, any>;
  audits: Record<string, any>;
  categories: Record<string, any>;
  categoryGroups: Record<string, any>;
  timing: Record<string, any>;
  i18n: Record<string, any>;
};

export type PagespeedSuccessResponse = {
  success: true;
  captchaResult: string;
  kind: string;
  id: string;
  loadingExperience: Record<string, unknown>;
  originLoadingExperience: Record<string, unknown>;
  lighthouseResult: LighthouseResult;
  analysisUTCTimestamp: string;
  responseCode?: number;
};

export type PagespeedErrorResponse = {
  success: false;
  code: number;
  errors: Record<string, unknown>[];
  status: string;
  lighthouseResult?: LighthouseResult;
};

export type PagespeedResponse = PagespeedSuccessResponse | PagespeedErrorResponse;
