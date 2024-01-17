import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // get the token  from storage
  const token: string | null = sessionStorage.getItem('token');
  if (token === null) {
    return next(req);
  }

  const reqClone = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(reqClone);
};
