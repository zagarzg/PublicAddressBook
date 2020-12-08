import { Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/contact.model'
import { tap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from './paging.model';
import { PageEvent } from '@angular/material/paginator';
import { Form, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  dataSource: Contact[];
  searchKey: string;
  paging = new Paging();
  displayedColumns: string[] = ['fullName', 'address.city', 'address.street', 
                                  'address.houseNumber', 'dateOfBirth', 'actions'];

  constructor(public contactsService: ContactsService) { }

  ngOnInit() {
    this.fetchContacts(this.paging.CurrentPage, this.paging.PageSize)
  }

  onCreateOrUpdate(contact: Contact){
    this.fetchContacts(this.paging.CurrentPage, this.paging.PageSize)
  }

  onDelete(id: string) {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(contact => contact.id !== id)})
    }
  
  onUpdate(contact: Contact) {
    this.contactsService.startedEditing.next(contact);
  }

  onPageChange(page: PageEvent) {
    this.fetchContacts(page.pageIndex + 1, page.pageSize, this.searchKey)
  }

  fetchContacts(page, pageSize, searchString?) {
    // fetch contacts for new page.pageIndex and page.pageSize (coming as parameter from event)
    this.contactsService.getContacts(page, pageSize, searchString).pipe(
      tap(res => console.log(res.body)),
      tap(res => this.dataSource = Object.assign([], res.body as unknown as MatTableDataSource<Contact []>))
    )
    .subscribe(
      res => this.setPagemodel(res)
    );
  }

  setPagemodel(res) {
    // retrieve paging headers
    let pagination = JSON.parse(res.headers.get('pagination')) as Paging;

    // update paging model
    // which reflects onto paginator in html
    this.paging.CurrentPage = pagination.CurrentPage + 1;
    this.paging.PageSize = pagination.PageSize;
    this.paging.TotalCount = pagination.TotalCount;
  }

  applyFilter(searchKey) {
    this.fetchContacts(1, this.paging.PageSize, searchKey);
  }


}