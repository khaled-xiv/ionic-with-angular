import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController, NavController} from "@ionic/angular";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";
import {Place} from "../../place.model";
import {PlacesService} from "../../places.service";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  private place: Place;

  constructor(private router:Router,
              private navCtrl:NavController,
              private modalCtrl:ModalController,
              private route:ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.router.navigate(['/places/tabs/discover']);
    this.modalCtrl.create(
          {component:CreateBookingComponent,
          componentProps:{selectedPlace:this.place},
          id:'book-add'
        })
        .then(modal=>{
          modal.present();
          return modal.onDidDismiss();
        }).then(resultData=>{
            console.log(resultData.data,resultData.role)
          })

  }
}
