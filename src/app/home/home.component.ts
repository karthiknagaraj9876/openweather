import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient,private translate: TranslateService) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    translate.use(this.selected_language_to_translate);

    
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  //Preparing URL to request data
  api_results : any = [];
  result:any;

  //Define Default Languages
  selected_language = "English";
  selected_language_to_translate = "en";

  //Define Strings 
  temperature_string = "Temperature";
  humidity_string = "Humidity";
  wind_speed_string = "Wind Speed";
  language_string   ="Language";
  logout_string = "Logout";

  //Get weather data 
  getWeatherData(){

    let api_key = "ac90dd92f7c33630af6887e385a7e3b8";
    const city_arr = ['mysore','Bengaluru','Mangalore','Mandya'];

    for(let i=0;i<city_arr.length;++i){
   
      let url     ="http://api.openweathermap.org/data/2.5/weather?q="+city_arr[i]+"&units=metric"+"&appid="+api_key;

      this.http.get(url).subscribe(
      (response) => {                         
        this.result = response; 
        this.api_results.push(response);
        console.log(response);
      });

      if(i==city_arr.length-1){
        console.log(this.api_results);
      }
    }

  }


  changeLanguage(language : string){

    this.selected_language = language;
    this.selected_language_to_translate = language;

    if(language=="en"){

      this.selected_language = "English";

    }
    else if(language=="ka"){
      this.selected_language = "ಕನ್ನಡ";

    }
    else{
      this.selected_language = "हिन्दी";
    }

    this.translate.use(this.selected_language_to_translate);

  }

}
