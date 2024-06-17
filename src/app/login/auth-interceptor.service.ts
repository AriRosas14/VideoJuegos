import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosService } from '../productos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  

  constructor(private authServ: ProductosService) { }
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const accessToken = this.authServ.getAccessToken();
      if (accessToken) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        
      }
      return next.handle(req)
  }
}