import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/contact.model'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public contacts: Contact[];
  displayedColumns: string[] = ['fullName', 'address.city', 'address.street', 
                                  'address.houseNumber', 'dateOfBirth'];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts()
    .subscribe(res => {
      this.contacts = res;
    }, error => console.log(error),
    () => console.log(this.contacts));
    ;
  }
}