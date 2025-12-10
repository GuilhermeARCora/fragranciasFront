import { TestBed } from '@angular/core/testing';

import { AdminPanelService } from './admin-panel.service';
import { environment } from '../../../../environments/environment';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import type { ResponseData } from '../../../shared/types/responseData';
import type { OrdersEvolution, OrdersStatistics, ProductsStatistics } from '../../../shared/types/adminPanel';

describe('AdminPanelService', () => {
  let service: AdminPanelService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const pathOrder = 'orders';
  const pathProduct = 'products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AdminPanelService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AdminPanelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fill the ordersStatistics signal', () => {
    const statisticsUrl = `${apiUrl}${pathOrder}/statistics`;
    const resMock:ResponseData<OrdersStatistics> = {
      status: 0,
      message: '',
      data: {
        amountStatusPendente: 0,
        amountStatusConcluido: 0,
        amountStatusCancelado: 0,
        amountInTheLastTwoDays: 0,
        amountWithFinalPriceOverFiveHundred: 0
      }
    };

    service.getStatisticsForOrder();

    const req = httpMock.expectOne(statisticsUrl);

    expect(req.request.method).toBe('GET');
    req.flush(resMock);

    expect(service.ordersStatistics()).toEqual(resMock.data);
  });

  it('should fill the ordersEvolution signal', () => {
    const odersEvoUrl = `${apiUrl}${pathOrder}/ordersEvolution`;
    const resMock:ResponseData<OrdersEvolution[]> = {
      status: 0,
      message: '',
      data: [
        {
          month: '',
          PENDENTE: 0,
          CONCLUIDO: 0,
          CANCELADO: 0
        }
      ]

    };

    service.getOrdersEvolution();

    const req = httpMock.expectOne(odersEvoUrl);

    expect(req.request.method).toBe('GET');
    req.flush(resMock);

    expect(service.ordersEvolution()).toEqual(resMock.data);
  });

  it('should fill the productsStatistics signal', () => {
    const prodStatsUrl = `${apiUrl}${pathProduct}/statistics`;
    const resMock:ResponseData<ProductsStatistics> = {
      status: 0,
      message: '',
      data: {
        countActiveProds: 0,
        countInactiveProds: 0,
        countInPromo: 0,
        greatestDiscount: 0,
        countProdsAroma: 0,
        countProdsAuto: 0,
        countProdsCasa: 0,
        countProdsDest: 0
      }

    };

    service.getProductsStatistics();

    const req = httpMock.expectOne(prodStatsUrl);

    expect(req.request.method).toBe('GET');
    req.flush(resMock);

    expect(service.productsStatistics()).toEqual(resMock.data);
  });

});
