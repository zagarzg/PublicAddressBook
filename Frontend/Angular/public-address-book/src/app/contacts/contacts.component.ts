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

  public dataSource = new MatTableDataSource<Contact>([]);

  displayedColumns: string[] = ['fullName', 'address.city', 'address.street', 
                                  'address.houseNumber', 'dateOfBirth'];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContacts()
    .subscribe(res => {
      this.dataSource.data = res;
    }, error => console.log(error),
    () => console.log(this.dataSource.data));
    ;
  }

  
}