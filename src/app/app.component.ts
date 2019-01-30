import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAr91BQpn3Gi73mQdTCCG2nbOBGRn-peg0",
      authDomain: "ng-recipe-book-c3a67.firebaseapp.com"
    });
  }

  loadedFeature = 'recipe';

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
