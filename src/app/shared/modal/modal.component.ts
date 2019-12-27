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
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  result: Flight[];

  airportForm = new FormGroup({
    minutes: new FormControl('', [Validators.required, Validators.min(300)]),
    type: new FormControl('arrival', [Validators.required, Validators.pattern(/arrival|departure/)]),
  });
  constructor(private api: ApiService) { }

  onSubmit() {
    const minutes = this.airportForm.get('minutes').value;
    const type = this.airportForm.get('type').value;
    let subscription: Observable<Flight[]>;
    if (type === 'arrival') {
      subscription = this.api.arrivalsByAirport(this.airport.icao, minutes);
    } else {
      subscription = this.api.departuresByAirport(this.airport.icao, minutes);
    }
    this.result = undefined;
    subscription.subscribe(flights => {
      console.log({flights});
      this.result = flights;
    },
    err => {
      console.log({err});
      if (err.status === 404) { this.result = []; }
    });
  }

  ngOnInit() {
  }

}
