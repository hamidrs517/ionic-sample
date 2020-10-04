import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  root = "http://192.168.1.101:5000/api"
  constructor() { }
}