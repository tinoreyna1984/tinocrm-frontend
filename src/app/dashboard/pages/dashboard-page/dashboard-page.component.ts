import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  constructor(private dashboardService: DashboardService){}

  productosVendidos: any;
  productosMasVendidos: any;
  prodsMasVendidos: any;
  cantidadProdsMasVendidos: number = 0;
  totalVendido: number = 0;

  ngOnInit(): void {
    this.dashboardService.getProductosVendidos().subscribe(
      {
        next: (prods: any) => {
          this.productosVendidos = prods;
          const maxVentas = Math.max(...this.productosVendidos.map((prod: any) => prod.numVentas));
          this.prodsMasVendidos = this.productosVendidos.filter((prod: any) => prod.numVentas === maxVentas);
          this.cantidadProdsMasVendidos = this.prodsMasVendidos.length;
        },
        error: (e:any) => {
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
    this.dashboardService.getTotalVendido().subscribe(
      {
        next: (tv: any) => {
          this.totalVendido = tv.totalVendido;
        },
        error: (e:any) => {
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }
}
