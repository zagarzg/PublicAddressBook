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

  contactsList: Contact [];

  constructor(private _http: HttpClient) { }

  getContacts() {
    this._http.get<Contact []>(this.url + '/GetAll').subscribe(res => {
      this.contactsList = res as Contact[] }
    );
  }

  createContact(formData: Contact){
    return this._http.post(this.url + '/Create', formData).subscribe(res =>
       this.contactsList = [...this.contactsList, res as Contact])
  }

  deleteContact(id: number) {
    return this._http.delete(this.url + '/Delete/' + id).subscribe(() => {
      this.getContacts();
    })
  }
}
