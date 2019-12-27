import { Component, OnInit } from '@angular/core';
import { Airport } from '../models/Airport';
import { ApiService } from '../api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  airports: Airport[] = [];
  airport: Airport;
  modalVisible = false;
  constructor(private api: ApiService, private sanitize: DomSanitizer) {
    this.airports = this.api.airports;
  }

  ngOnInit() {}

  onAirportClick(airport: Airport) {
    this.airport = airport;
    this.modalVisible = true;
  }
  getLogo(countryCode: string): SafeUrl {
    return this.sanitize.bypassSecurityTrustUrl(`https://www.countryflags.io/${countryCode}/flat/64.png`);
  }

}
