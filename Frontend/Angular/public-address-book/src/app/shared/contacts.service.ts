import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from '../shared/contact.model';
import { Observable, Subject } from 'rxjs';
import { Paging } from '../contacts/paging.model';
import { PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private url = 'https://localhost:44331/Contact';

  formData: Contact;

  startedEditing = new Subject<Contact>();

  constructor(private _http: HttpClient) { }

  // tap, take, map, combineLatest, switchMap, concatMap, fork, distinctUntilChanged, delay, Subject, BehaviourSubject, ReplaySubject, 
  getContacts(pageNumber: number = 1, pageSize: number = 5, searchString?: string) {

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    if(searchString) {
      params = params.append('searchString', searchString)
    }
    return this._http.get<Contact []>(`${this.url}/GetAll`, { observe: 'response', params })
  }

  getContact(contactId: string) {
    return this._http.get(this.url + '/Get/' + contactId)
  }

  createContact(formData: Contact) {
    return this._http.post(this.url + '/Create', formData)
  }

  updateContact(formData: Contact) {
    return this._http.put(this.url + '/Update', formData)
  }

  deleteContact(id: string) {
    return this._http.delete(this.url + '/Delete/' + id)
    }
}

