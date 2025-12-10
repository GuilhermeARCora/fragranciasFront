import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import type { ResponseData } from '../../../shared/types/responseData';
import type { Product, ProductFilters, ProductForm, ProductsList } from '../../../shared/types/product';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const path = 'products';

  const resProduct:ResponseData<Product> = {
    status: 0,
    message: '',
    data: {
      _id: '',
      name: '',
      fullPrice: 0,
      currentPrice: 0,
      pixPrice: 0,
      image: '',
      promoPercentage: 0
    }
  };

  const resProductList:ResponseData<ProductsList> = {
    status: 0,
    message: '',
    data: {
      products: [],
      amount: 0
    }
  };

  const productFromForm:ProductForm = {
    name: '',
    fullPrice: 0,
    description: '',
    image: new File(['teste'], 'teste'),
    categories: ['aromatizadores'],
    cod: '',
    promoPercentage: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        ProductsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product', () => {
    const myUrl = `${apiUrl}${path}/`;
    const formData = new FormData();

    formData.append('name', productFromForm.name);
    formData.append('fullPrice', String(productFromForm.fullPrice));

    if (productFromForm.promoPercentage !== undefined) {
      formData.append('promoPercentage', String(productFromForm.promoPercentage));
    };

    formData.append('cod', String(productFromForm.cod));
    formData.append('description', productFromForm.description);

    productFromForm.categories.forEach(cat => formData.append('categories', cat));

    if (productFromForm.image instanceof File) {
      formData.append('image', productFromForm.image);
    };

    const result$ = service.createProduct(productFromForm);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(resProduct);
  });

  it('should edit a product', () => {
    const id = '123';
    const myUrl = `${apiUrl}${path}/${id}`;
    const formData = new FormData();

    formData.append('name', productFromForm.name);
    formData.append('fullPrice', String(productFromForm.fullPrice));

    if (productFromForm.promoPercentage !== undefined) {
      formData.append('promoPercentage', String(productFromForm.promoPercentage));
    };

    formData.append('cod', String(productFromForm.cod));
    formData.append('description', productFromForm.description);

    productFromForm.categories.forEach(cat => formData.append('categories', cat));

    if (productFromForm.image instanceof File) {
      formData.append('image', productFromForm.image);
    };

    const result$ = service.editProduct(productFromForm, id);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(formData);
    req.flush(resProduct);
  });

  it('should delete a product', () => {
    const id = '123';
    const myUrl = `${apiUrl}${path}/${id}`;

    const result$ = service.deleteProduct(id);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(resProduct);
  });

  it('should change the status of a product', () => {
    const id = '123';
    const myUrl = `${apiUrl}${path}/${id}/status`;

    const result$ = service.changeStatusProduct(true ,id);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ active: true });
    req.flush(resProduct);
  });

  it('should get a product', () => {
    const id = '123';
    const myUrl = `${apiUrl}${path}/${id}`;

    const result$ = service.getOneProduct(id);
    result$.subscribe(v => expect(v).toEqual(resProduct.data));

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('GET');
    req.flush(resProduct);
  });

  it('should get all products', () => {
    const myUrl = `${apiUrl}${path}/`;
    const filters: Partial<ProductFilters> = { active: true };

    const result$ = service.getAllProducts(filters);
    result$.subscribe(v => expect(v).toEqual(resProductList.data.products));

    const req = httpMock.expectOne(`${myUrl}?active=true`);
    expect(req.request.method).toBe('GET');
    req.flush(resProductList);

    expect(service.productsSubject.getValue()).toEqual(resProductList.data.products);
  });

  it('should get the last added products if cached is falsy', () => {
    const myUrl = `${apiUrl}${path}/latest`;
    spyOn(sessionStorage, 'setItem');

    const result$ = service.getLastAddedProducts();
    result$.subscribe(v => expect(v).toEqual(resProductList.data.products));

    const req = httpMock.expectOne(myUrl);
    expect(req.request.method).toBe('GET');
    req.flush(resProductList);

    expect(sessionStorage.setItem).toHaveBeenCalledWith('lastAdded', JSON.stringify(resProductList.data.products));
  });

  it('should get the last added products from session storage if cached is true, and not hit the endpoint', () => {
    const myUrl = `${apiUrl}${path}/latest`;

    sessionStorage.setItem('lastAdded', JSON.stringify(resProductList.data.products));

    const result$ = service.getLastAddedProducts();
    result$.subscribe(v => expect(v).toEqual(resProductList.data.products));

    httpMock.expectNone(myUrl);
  });

  it('should get product by category', () => {
    const category = 'destaque';
    const myUrl = `${apiUrl}${path}/category/${category}`;

    const result$ = service.getProductsByCategory(category);
    result$.subscribe();

    const req = httpMock.expectOne(`${myUrl}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(resProductList);
  });

  it('should get destaques if cached is falsy', () => {
    const category = 'destaque';
    const myUrl = `${apiUrl}${path}/category/${category}`;
    spyOn(sessionStorage, 'setItem');

    const result$ = service.getDestaques(category);
    result$.subscribe();

    const req = httpMock.expectOne(`${myUrl}?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(resProductList);

    expect(sessionStorage.setItem).toHaveBeenCalledWith('destaques', JSON.stringify(resProductList.data.products));
  });

  it('should get destaques from session storage if cached is true, and not hit the endpoint', () => {
    const category = 'destaque';
    const myUrl = `${apiUrl}${path}/category/${category}`;

    sessionStorage.setItem('destaques', JSON.stringify(resProductList.data.products));

    const result$ = service.getDestaques();
    result$.subscribe(v => expect(v).toEqual(resProductList.data.products));

    httpMock.expectNone(myUrl);
  });

});
