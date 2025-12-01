import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/service/service.index';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  invoice: any = null;
  loading = true;
  http: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.commonService.getInvoiceByAppointment(id).subscribe((res: any) => {
        this.invoice = res.data ? res.data : res;
        this.loading = false;
      });
    }
  }
  // print(appointmentId: string) {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });

  //   return this.http.get(
  //     `${environment.Api_url}/api/invoice/print/${appointmentId}`,
  //     { headers, responseType: 'text' }
  //   );
  // }
  print() {
    if (!this.invoice) return;
    window.open(
      this.commonService.baseUrl + 'api/invoice/print/' + this.invoice.appointmentId + '/pdf',
      '_blank'
    );
  }
}