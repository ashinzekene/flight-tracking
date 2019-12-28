import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from './models/Flight';
import { airports } from './data/airports';
import { Airport } from './models/Airport';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_ROOT = 'https://opensky-network.org/api';
  private aiports: Airport[] = airports;

  constructor(private http: HttpClient) { }

  arrivalsByAirport(airportICAO: string, hours: number, minutes: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.getUrl('arrival', airportICAO, this.getTime(hours, minutes), this.now()));
  }

  departuresByAirport(airportICAO: string, hours: number, minutes: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.getUrl('departure', airportICAO, this.getTime(hours, minutes), this.now()));
  }

  get airports(): Airport[] {
    return this.aiports.slice(0, 24);
  }

  private now(): string {
    return (+new Date() / 1000).toFixed(0);
  }

  private getTime(hrs: number, mins: number): string {
    const oneHr = 3.6E6;
    const date = +new Date();
    const diff =  (oneHr / 60 * mins) + (oneHr * hrs);
    return ((date - diff) / 1000).toFixed();
  }

  private getAirportFromICAO(icao: string) {
    return this.http.get(`http://www.airport-data.com/api/ap_info.json?icao=${icao}`);
  }

  private getUrl(type: 'departure'|'arrival', airportICAO: string, begin: string, end: string) {
    return `${this.API_ROOT}/flights/${type}?begin=${begin}&end=${end}&airport=${airportICAO}`;
  }

}
