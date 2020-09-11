import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActionSheetController, ModalController, NavController} from "@ionic/angular";
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
              private placesService: PlacesService,
              private actionSheetCtrl:ActionSheetController) { }

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
    this.actionSheetCtrl.create({
        header:'Choose an action',
        buttons:[
            {text:'Select date',handler:()=>{
                this.openBookingModal('select')}},
            {text:'Random date',handler:()=>{
                this.openBookingModal('random')}},
            {text:'Cancel',role:'cancel'}
        ]
    }).then(actionSheetElm=>{
        actionSheetElm.present();
      });
  }

  openBookingModal(mode:'select' |'random'){
      console.log(mode);
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
