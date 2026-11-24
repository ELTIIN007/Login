import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError, delay } from 'rxjs';

export const mockBackendInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.endsWith('/auth/me')) {
    return next(request);
  }

  const authorization = request.headers.get('Authorization');
  if (authorization === 'Bearer token-valido-emily') {
    return of(new HttpResponse({
      status: 200,
      body: { name: 'Emily', email: 'emily@email.com' }
    })).pipe(delay(250));
  }

  return throwError(() => ({
    status: 401,
    statusText: 'Unauthorized'
  })).pipe(delay(250));
};
