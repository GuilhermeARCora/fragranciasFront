import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product, ProductAllRes, ProductByCategoryRes, ProductForm, ProductResponse } from '../../../shared/types/Product';
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
      map(v => v.product)
    )
  };

  getOneProduct(id: string | null):Observable<Product>{
    return this.http.get<ProductResponse>(`${this.apiUrl}${this.path}/${id}`).pipe(
      map((v) => v.product)
    )
  };

  getAllProducts(filters: any):Observable<Product[]>{
    const params = new HttpParams({fromObject:filters});

    return this.http.get<ProductAllRes>(`${this.apiUrl}${this.path}/`, { params }).pipe(
      map((res: ProductAllRes): Product[] => res.products),
      tap(p => this.productsSubject.next(p))
    )
  };

  getLastAddedProducts():Observable<Product[]>{
    return this.http.get<ProductAllRes>(`${this.apiUrl}${this.path}/novidades`).pipe(
      map((res: ProductAllRes): Product[] => res.products),
      tap(v => console.log(v))
    );
  };

  getProductsByCategory(category: string, page = 1): Observable<ProductByCategoryRes> {
    const params = new HttpParams()
    .set('category', category)
    .set('page', page);

    return this.http.get<ProductByCategoryRes>(`${this.apiUrl}${this.path}/productsByCategory`, { params });
  };

};
