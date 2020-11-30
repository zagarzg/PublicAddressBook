import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../shared/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private url = 'https://localhost:44331/Contact';

  formData: Contact;

  

  constructor(private _http: HttpClient) { }

  getContacts() {
    return this._http.get<Contact []>(this.url + '/GetAll');
  }

  createContact(formData: Contact){
    return this._http.post(this.url + '/Create', formData)
  }
}
