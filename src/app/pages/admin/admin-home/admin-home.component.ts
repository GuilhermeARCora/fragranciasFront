import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
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
  Filler,
} from 'chart.js';
import { MatIconModule } from '@angular/material/icon';

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
@Component({
  selector: 'app-admin-home',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    MatIconModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

   // 🟢 Mock de cards de visão geral
  summaryCards = [
    { title: 'Pedidos Pendentes', value: 8 },
    { title: 'Pedidos Concluídos', value: 237 },
    { title: 'Produtos Ativos', value: 42 },
    { title: 'Produtos Inativos', value: 5 },
  ];

  // 🟡 Gráfico de pedidos
  ordersChartLabels = ['Pendentes', 'Concluídos'];
  ordersChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.ordersChartLabels,
    datasets: [{
      data: [8, 237],
      backgroundColor: ['#ffca28', '#0f877b']
    }]
  };

  // 🟣 Gráfico de produtos por categoria
  productsChartLabels = ['Aromatizadores', 'AutoCuidado', 'Casa e Bem Estar'];
  productsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.productsChartLabels,
    datasets: [{
      data: [20, 10, 12],
      label: 'Produtos',
      backgroundColor: '#0f877b'
    }]
  };

  // 📈 MOCK - Evolução de pedidos por mês
  ordersOverTimeData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
    datasets: [
      {
        label: 'Pedidos Concluídos',
        data: [15, 20, 18, 25, 30, 28, 35, 40],
        borderColor: '#0F877B',
        backgroundColor: 'rgba(15,135,123,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#0F877B'
      },
      {
        label: 'Pedidos Pendentes',
        data: [5, 7, 6, 8, 4, 9, 3, 6],
        borderColor: '#FFCA28',
        backgroundColor: 'rgba(255,202,40,0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#FFCA28'
      }
    ]
  };

  ordersOverTimeOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // agora reconhecido como literal válido
        labels: { boxWidth: 12 }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  // 💎 MOCK - Estatísticas de produtos
  productStats = [
    {
      title: 'Produtos em promoção',
      value: 12,
      icon: 'sell',
      color: '#FFCA28'
    },
    {
      title: 'Preço médio dos produtos ativos',
      value: 'R$ 78,90',
      icon: 'attach_money',
      color: '#0F877B'
    },
    {
      title: 'Maior desconto ativo',
      value: '35%',
      icon: 'percent',
      color: '#d32f2f'
    }
  ];

};
