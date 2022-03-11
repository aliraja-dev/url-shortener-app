import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'

import { environment } from "src/environments/environment";
import { BitLyResponse } from "../interfaces/bitlyResponse.interface";

@Injectable({providedIn: 'root'})
export class UrlShortenService{
constructor(private http: HttpClient){}

  shortenUrl(url:string){
    const data = {
      long_url: url,
      domain: "bit.ly"
    }
    return this.http.post<BitLyResponse>(environment.bitly_url, data );
  }
}
