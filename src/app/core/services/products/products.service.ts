import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product, ProductAllRes, ProductForm, ProductResponse } from '../../../shared/types/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  path = 'products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this.productsSubject.asObservable();

  createProduct(product :ProductForm):Observable<ProductResponse>{

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('fullPrice', String(product.fullPrice));

    if (product.promoPercentage !== undefined) {
      formData.append('promoPercentage', String(product.promoPercentage));
    };

    formData.append('cod', String(product.cod));
    formData.append('description', product.description);

    product.categories.forEach(cat => formData.append('categories', cat));

    if (product.image instanceof File) {
      formData.append('image', product.image);
    };

    return this.http.post<ProductResponse>(`${this.apiUrl}${this.path}/`, formData)
  };

  editProduct(product:ProductForm, id: string | null):Observable<ProductResponse>{

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('fullPrice', String(product.fullPrice));

    if (product.promoPercentage !== undefined) {
      formData.append('promoPercentage', String(product.promoPercentage));
    };

    formData.append('cod', String(product.cod));
    formData.append('description', product.description);

    product.categories.forEach(cat => formData.append('categories', cat));

    if (product.image instanceof File) {
      formData.append('image', product.image);
    };

    return this.http.patch<ProductResponse>(`${this.apiUrl}${this.path}/${id}`, formData)
  };

  deleteProduct(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${this.path}/${id}`)
  };

  changeStatusProduct(status:boolean, id:string):Observable<Product>{
    return this.http.patch<ProductResponse>(`${this.apiUrl}${this.path}/changeStatus/${id}`, {active : status}).pipe(
      map(v => v.product),
      tap(updatedProduct => {
        const current = this.productsSubject.value ?? [];
        const novaLista = current.map(prod =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        );
        this.productsSubject.next(novaLista);
      })
    )
  };

  getOneProduct(id: string | null):Observable<Product>{
    return this.http.get<ProductResponse>(`${this.apiUrl}${this.path}/${id}`).pipe(
      map((v) => v.product)
    )
  };

  getAllProducts():Observable<Product[]>{
    return this.http.get<ProductAllRes>(`${this.apiUrl}${this.path}/`).pipe(
      map((res: ProductAllRes): Product[] => res.products),
      tap(p => this.productsSubject.next(p))
    )
  };

};
