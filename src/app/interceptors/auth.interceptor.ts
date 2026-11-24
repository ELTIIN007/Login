import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.startsWith('https://viacep.com.br')) {
    return next(request);
  }

  const token = localStorage.getItem('auth_token');
  if (!token) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  }));
};
