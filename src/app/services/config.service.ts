import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  root = "http://192.168.43.121:5000/api"
  constructor() { }
}
