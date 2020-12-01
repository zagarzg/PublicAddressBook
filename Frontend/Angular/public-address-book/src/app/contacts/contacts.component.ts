import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/contact.model'
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public dataSource: Contact [];

  displayedColumns: string[] = ['fullName', 'address.city', 'address.street', 
                                  'address.houseNumber', 'dateOfBirth', 'actions'];

  constructor(private contactsService: ContactsService) { 
    
  }

  ngOnInit() {
    this.contactsService.getContacts();
    // setTimeout( () => {this.dataSource = this.contactsService.contactsList}, 5000);
  }

  onDelete(id: number) {
    this.contactsService.deleteContact(id);
  }

  
}