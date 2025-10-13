import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Product, ProductForm, ProductsList } from '../../../shared/types/Product';
import { ResponseData } from '../../../shared/types/ResponseData';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  path = 'products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this.productsSubject.asObservable();

  createProduct(product :ProductForm):Observable<ResponseData<Product>>{

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

    return this.http.post<ResponseData<Product>>(`${this.apiUrl}${this.path}/`, formData)
  };

  editProduct(product:ProductForm, id: string | null):Observable<ResponseData<Product>>{

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

    return this.http.patch<ResponseData<Product>>(`${this.apiUrl}${this.path}/${id}`, formData)
  };

  deleteProduct(id:string):Observable<ResponseData<{}>>{
    return this.http.delete<ResponseData<{}>>(`${this.apiUrl}${this.path}/${id}`)
  };

  changeStatusProduct(status:boolean, id:string):Observable<Product>{
    return this.http.patch<ResponseData<Product>>(`${this.apiUrl}${this.path}/${id}/status`, {active : status}).pipe(
      map(v => v.data)
    )
  };

  getOneProduct(id: string | null):Observable<Product>{
    return this.http.get<ResponseData<Product>>(`${this.apiUrl}${this.path}/${id}`).pipe(
      map((v) => v.data)
    )
  };

  getAllProducts(filters: Partial<Product>):Observable<Product[]>{
    const params = new HttpParams({fromObject:filters});

    return this.http.get<ResponseData<ProductsList>>(`${this.apiUrl}${this.path}/`, { params }).pipe(
      map((res) => res.data.products),
      tap(p => this.productsSubject.next(p))
    );
  };

  getLastAddedProducts():Observable<Product[]>{
    return this.http.get<ResponseData<ProductsList>>(`${this.apiUrl}${this.path}/novidades`).pipe(
      map( res => res.data.products),
      shareReplay(1)
    );
  };

  getProductsByCategory(category: string, page = 1): Observable<ResponseData<ProductsList>> {
    const params = new HttpParams().set('page', page);

    return this.http.get<ResponseData<ProductsList>>(`${this.apiUrl}${this.path}/category/${category}`, { params });
  };

  searchAutoComplete(filter : string): Observable<Product[]>{
    const params = new HttpParams().set('q', filter);

    return this.http.get<ResponseData<ProductsList>>(`${this.apiUrl}${this.path}/searchAutoComplete`, { params }).pipe(
      map(v => v.data.products)
    );
  };

};
