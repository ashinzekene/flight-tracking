import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Airport } from 'src/app/models/Airport';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/Flight';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() airport: Airport;
  @Input() visible: boolean;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  result: Flight[];
  loading = false;

  airportForm = new FormGroup({
    minutes: new FormControl('', [Validators.required, Validators.min(0), Validators.max(60)]),
    hours: new FormControl('', [Validators.required, Validators.min(0), Validators.max(60)]),
    type: new FormControl('arrival', [Validators.required, Validators.pattern(/arrival|departure/)]),
  });

  constructor(private api: ApiService) { }

  onSubmit() {
    const minutes = this.airportForm.get('minutes').value;
    const hours = this.airportForm.get('hours').value;
    const type = this.airportForm.get('type').value;
    this.loading = true;

    let subscription: Observable<Flight[]>;
    if (type === 'arrival') {
      subscription = this.api.arrivalsByAirport(this.airport.icao, hours, minutes);
    } else {
      subscription = this.api.departuresByAirport(this.airport.icao, hours, minutes);
    }
    this.result = undefined;
    subscription.subscribe(flights => {
      this.result = flights;
      this.loading = false;
    },
      err => {
        if (err.status === 404) { this.result = []; }
        this.loading = false;
      });
  }

  getDate(time?: number) {
    if (!time) { return 'Unknown'; }
    return (new Date(time * 1000)).toTimeString();
  }

  ngOnInit() {
  }

}
