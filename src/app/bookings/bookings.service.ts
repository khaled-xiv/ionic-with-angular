import { Injectable } from '@angular/core';
import {Booking} from "./booking.model";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings:Booking[]=[
      {
        id:'xyz',
        placeId:'1',
        placeTitle:'title',
        userId:'user1',
        guestNumber:15
      }
  ];
  constructor() { }

  getBookings(){
    return [...this._bookings];
  }

}
