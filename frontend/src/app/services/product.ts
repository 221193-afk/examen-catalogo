import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  byCategory(categoryId: number) {
  console.log('Llamando a /products/category/' + categoryId);  // ← agrega log
  return this.http.get<any[]>(`${this.apiUrl}/products/category/${categoryId}`);
}
}