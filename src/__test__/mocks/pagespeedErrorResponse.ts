/**
 * @author Anton Repin
 */
export const pagespeedErrorResponse = {
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
