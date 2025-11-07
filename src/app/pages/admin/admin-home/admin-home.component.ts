import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  // controladores
  BarController,
  DoughnutController,
  LineController,
  // elementos
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  // escalas
  CategoryScale,
  LinearScale,
  // utilitários
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { AdminPanelService } from '../../../core/services/adminPanel/admin-panel.service';
import type { ChartConfiguration } from 'chart.js';
import type { OnInit } from '@angular/core';

Chart.register(
  // controladores
  BarController, DoughnutController, LineController,
  // elementos
  BarElement, ArcElement, LineElement, PointElement,
  // escalas
  CategoryScale, LinearScale,
  // plugins utilitários
  Tooltip, Legend, Filler
);

interface SummaryCards {
  title: string,
  filter: object,
  value: string | number,
  route: string,
  borderColor: string
};
@Component({
  selector: 'app-admin-home',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit{

  router = inject(Router);
  adminPanelService = inject(AdminPanelService);

  ngOnInit(): void {
    this.adminPanelService.getStatisticsForOrder();
    this.adminPanelService.getOrdersEvolution();
    this.adminPanelService.getProductsStatistics();
  };

  redirectWithFilter(filter: object, route: string){
    const destination = `/admin/${route}`;
    return this.router.navigate([destination], { state: { filter }, replaceUrl: true });
  };

  readonly summaryCards = computed<SummaryCards[]>(() => [
    {
      title: 'Pedidos Concluídos',
      value: this.adminPanelService.ordersStatistics()?.amountStatusConcluido ?? 0,
      filter: { status: 'CONCLUIDO' },
      route: 'pedidos',
      borderColor: 'card-sucesso'
    },
    {
      title: 'Pedidos Pendentes',
      value: this.adminPanelService.ordersStatistics()?.amountStatusPendente ?? 0,
      filter: { status: 'PENDENTE' },
      route: 'pedidos',
      borderColor: 'card-atencao'
    },
    {
      title: 'Pedidos nas últimas 48h',
      value: this.adminPanelService.ordersStatistics()?.amountInTheLastTwoDays ?? 0,
      filter: { daysAgo: 2 },
      route: 'pedidos',
      borderColor: 'card-alerta'
    },
    {
      title: 'Pedidos >= R$500',
      value: this.adminPanelService.ordersStatistics()?.amountWithFinalPriceOverFiveHundred ?? 0,
      filter: { totalCurrentPrice: 500 },
      route: 'pedidos',
      borderColor: 'card-informacao'
    },
    {
      title: 'Produtos Ativos',
      value: this.adminPanelService.productsStatistics()?.countActiveProds ?? 0,
      filter: { active: true },
      route: 'produtos',
      borderColor: 'card-sucesso'
    },
    {
      title: 'Produtos Inativos',
      value: this.adminPanelService.productsStatistics()?.countInactiveProds ?? 0,
      filter: { active: false },
      route: 'produtos',
      borderColor: 'card-informacao'
    },
    {
      title: 'Produtos ativos em promoção',
      value: this.adminPanelService.productsStatistics()?.countInPromo ?? 0,
      filter: { isInPromo: true },
      route: 'produtos',
      borderColor: 'card-informacao'
    },
    {
      title: 'Maior desconto ativo',
      value: `${this.adminPanelService.productsStatistics()?.greatestDiscount ?? 0}%`,
      filter: { promoPercentage: this.adminPanelService.productsStatistics()?.greatestDiscount ?? 0 },
      route: 'produtos',
      borderColor: 'card-informacao'
    }
  ]);

  readonly ordersChartLabels = ['Pendentes', 'Concluídos', 'Cancelados'];
  readonly ordersChartData = computed<ChartConfiguration<'doughnut'>['data']>(() => ({
    labels: this.ordersChartLabels,
    datasets: [{
      data: [
        this.adminPanelService.ordersStatistics()?.amountStatusPendente ?? 0,
        this.adminPanelService.ordersStatistics()?.amountStatusConcluido ?? 0,
        this.adminPanelService.ordersStatistics()?.amountStatusCancelado ?? 0
      ],
      backgroundColor: ['#ffca28', '#0f877b', '#da0000ff']
    }]
  }));

  // 🟣 Gráfico de produtos por categoria
  productsChartLabels = ['Aromatizadores', 'AutoCuidado', 'Casa e Bem Estar', 'Destaque'];
  productsChartData =  computed<ChartConfiguration<'bar'>['data']>(() => ({
    labels: this.productsChartLabels,
    datasets: [{
      data: [
        this.adminPanelService.productsStatistics()?.countProdsAroma ?? 0,
        this.adminPanelService.productsStatistics()?.countProdsAuto ?? 0,
        this.adminPanelService.productsStatistics()?.countProdsCasa ?? 0,
        this.adminPanelService.productsStatistics()?.countProdsDest ?? 0
      ],
      label: 'Produtos',
      backgroundColor: '#0f877b'
    }]
  }));

  // 📈 Evolução de pedidos por mês
  readonly ordersOverTimeData = computed<ChartConfiguration<'line'>['data']>(() => {
    const evolution = this.adminPanelService.ordersEvolution();
    if (!evolution) return { labels: [], datasets: [] };

    const labels = evolution.map(e => e.month);

    const concluido = evolution.map(e => e.CONCLUIDO);
    const pendente = evolution.map(e => e.PENDENTE);
    const cancelado = evolution.map(e => e.CANCELADO);

    return {
      labels,
      datasets: [
        {
          label: 'Pedidos Concluídos',
          data: concluido,
          borderColor: '#0F877B',
          backgroundColor: 'rgba(15,135,123,0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#0F877B'
        },
        {
          label: 'Pedidos Pendentes',
          data: pendente,
          borderColor: '#FFCA28',
          backgroundColor: 'rgba(255,202,40,0.3)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#FFCA28'
        },
        {
          label: 'Pedidos Cancelados',
          data: cancelado,
          borderColor: '#f41111ff',
          pointRadius: 6,
          pointBackgroundColor: '#f41111ff'
        }
      ]
    };
  });

  ordersOverTimeOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12 }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

};
