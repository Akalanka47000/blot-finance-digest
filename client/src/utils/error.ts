import { toast } from 'sonner';

export function isAuthError(error: any): boolean {
  return error?.status === 401 || error?.status === 403;
}

export function filterErrors(error: { status: number; message: string }) {
  switch (error.status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
    case 424:
    case 429:
    case 500:
      if (!error.message?.startsWith('Request failed with status code')) {
        return error.message;
      }
      return undefined;
    case 0:
      return "We can't seem to connect right now. Please check your connection and try again.";
    default:
      return undefined;
  }
}

export const errTryAgainLater = 'Something went wrong! Please, try again later';

export function filterAndNotifyError(e) {
  toast.error(filterErrors(e) ?? 'Something went wrong!');
}

export function filterAndNotifyRetryError(e) {
  toast.error(filterErrors(e) ?? errTryAgainLater);
}
