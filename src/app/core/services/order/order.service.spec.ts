import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import type { Order, OrderCreateItem, OrderFilter } from '../../../shared/types/order';
import type { ResponseData } from '../../../shared/types/responseData';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const path = 'orders';

  const orderId: string = '69387876feb515376d101934';

  const items: OrderCreateItem[] = [
    {
      _id: '6913b5776d5541431f135605',
      name: 'Papel Perfumado para Gavetas LA AMOUR',
      fullPrice: 39.99,
      promoPercentage: 10,
      amount: 1,
      image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1763401002289.webp'
    },
    {
      _id: '6907f138c95ebfa9aaa9911a',
      name: 'Sabonete Liq. Desod. Black Vanilla - 200ml',
      fullPrice: 39.99,
      promoPercentage: 10,
      amount: 1,
      image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1762128183838.webp'
    }
  ];

  const successResMock:ResponseData<Order> = {
    status: 200,
    message: 'success',
    data: {
      _id: orderId,
      items: [],
      status: '',
      totalUnits: 0,
      totalFullPrice: 0,
      totalDiscount: 0,
      totalCurrentPrice: 0,
      totalPixPrice: 0,
      dayItWasIssued: ''
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        OrderService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an order', () => {
    const myUrl = `${apiUrl}${path}/`;
    const payload = { items };

    const result$ = service.createOrder(items);
    result$.subscribe(value => {
      expect(value).toBe(orderId);
    });

    const req = httpMock.expectOne(myUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(successResMock);
  });

  it('should complete an order', () => {
    const myUrl = `${apiUrl}${path}/${orderId}/status`;

    const result$ = service.completeOrder(orderId);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);

    expect(req.request.method).toBe('PATCH');
    req.flush(successResMock);
  });

  it('should cancel an order', () => {
    const myUrl = `${apiUrl}${path}/${orderId}/status`;

    const result$ = service.cancelOrder(orderId);
    result$.subscribe();

    const req = httpMock.expectOne(myUrl);

    expect(req.request.method).toBe('PATCH');
    req.flush(successResMock);
  });

  it('should find one order', () => {
    const myUrl = `${apiUrl}${path}/${orderId}`;

    const result$ = service.findOneOrder(orderId);
    result$.subscribe(value => {
      expect(value).toBe(successResMock.data);
    });

    const req = httpMock.expectOne(myUrl);

    expect(req.request.method).toBe('GET');
    req.flush(successResMock);
  });

  it('should find all orders', () => {
    const myUrl = `${apiUrl}${path}/`;
    const filters: OrderFilter = { status: 'PENDENTE' };
    const resMock = {
      status: 200,
      message: 'success',
      data: {
        orders: [
          {
            _id: '692e07bc710d328d038ed46d',
            items: [
              {
                _id: '6913bc986d5541431f13564e',
                name: 'Difusor de Varetas Lavanda Francesa - 200ml',
                fullPrice: 59.99,
                promoPercentage: 10,
                amount: 1,
                image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1762901143961.webp',
                currentPrice: 53.991,
                pixPrice: 10
              },
              {
                _id: '691b5c8210de11548fa04ac8',
                name: 'Difusor de Varetas Flor de Cerejeira - 200ml',
                fullPrice: 59.99,
                promoPercentage: 10,
                amount: 1,
                image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1763400833479.webp',
                currentPrice: 53.991,
                pixPrice: 10
              },
              {
                _id: '691b5e3f10de11548fa04af0',
                name: 'Difusor de Varetas Alecrim Silvestre - 200ml',
                fullPrice: 59.99,
                promoPercentage: 10,
                amount: 1,
                image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1763401278487.webp',
                currentPrice: 53.991,
                pixPrice: 10
              }
            ],
            status: 'PENDENTE',
            createdAt: '2025-12-01T21:25:16.167Z',
            totalUnits: 3,
            totalFullPrice: 179.97,
            totalCurrentPrice: 161.973,
            totalDiscount: 17.997000000000007,
            totalPixPrice: 153.87435,
            dayItWasIssued: '01/12/2025 18:25'
          },
          {
            _id: '692e3d47710d328d038ed4e3',
            items: [
              {
                _id: '6913ba936d5541431f13562b',
                name: 'Difusor de Varetas Capim Limão - 200ml',
                fullPrice: 59.99,
                promoPercentage: 10,
                amount: 1,
                image: 'https://sdgshkybabkcmmrdmzyg.supabase.co/storage/v1/object/public/products-images/products/1762900626957.webp',
                currentPrice: 53.991,
                pixPrice: 10
              }
            ],
            status: 'PENDENTE',
            createdAt: '2025-12-02T01:13:43.545Z',
            totalUnits: 1,
            totalFullPrice: 59.99,
            totalCurrentPrice: 53.991,
            totalDiscount: 5.999000000000002,
            totalPixPrice: 51.29145,
            dayItWasIssued: '01/12/2025 22:13'
          }
        ],
        amount: 2
      }
    };

    const result$ = service.findAllOrders(filters);
    result$.subscribe(value => {
      expect(value).toEqual(resMock.data.orders);
    });

    const req = httpMock.expectOne(`${myUrl}?status=PENDENTE`);

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('status')).toBe('PENDENTE');
    req.flush(resMock);
    expect(service.ordersSubject.getValue()).toEqual(resMock.data.orders);
  });

});
