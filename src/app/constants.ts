//import { isDevMode } from '@angular/core';
export const API_URL: string = (window.location.hostname == 'localhost') ? 'http://localhost:27636' : 'http://api.gosmart.kz';
console.log('isDevMode', API_URL);
//export const API_URL: string = 'http://api.admin.eri.gosmart.kz'; 