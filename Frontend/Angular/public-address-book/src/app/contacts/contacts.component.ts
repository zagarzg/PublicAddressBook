import { Component, DoCheck, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ContactsService } from '../shared/contacts.service';
import { Contact } from '../shared/contact.model'
import { tap, take, debounceTime } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Paging } from './paging.model';
import { PageEvent } from '@angular/material/paginator';
import { Form, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs/internal/observable/of';
import { Subject, Subscription } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { SortingModel } from 'src/app/contacts/sorting.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, OnDestroy {

  // data and columns displayed in table
  dataSource: Contact[];
  displayedColumns: string[] = ['fullName', 'address.city', 'address.street',
                                  'address.houseNumber', 'dateOfBirth', 'actions'];

  // paging sorting and filtering caches
  searchKey: string;
  sorting = new SortingModel;
  paging = new Paging();

  // filter event and handling
  filterSubject = new Subject();
  filterSubscription: Subscription;
  
  @ViewChild(MatTable, {static: false}) table: MatTable<Contact>;

  constructor(public contactsService: ContactsService) { }

  ngOnInit() {
    this.fetchContacts(this.paging.CurrentPage, this.paging.PageSize)
    this.handleFilter();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  //#region CRUD
  onCreateOrUpdate(contact: Contact){
    this.fetchContacts(this.paging.CurrentPage, this.paging.PageSize)
  }

  /**Handles effect after creating or updating contact action*/
  onHandleCreateUpdate(contact: Contact) {

    // Actually update or add contact into our datasource

    const index = this.dataSource.findIndex(c => c.id == contact.id);

    // update
    if(index >= 0) {
      this.dataSource[index] = contact;
    } else {
      this.dataSource.push(contact);
    }

    this.table.renderRows();
  }

  onDelete(id: string) {
    this.contactsService.deleteContact(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(contact => contact.id !== id)})
  }

  onUpdate(contact: Contact) {
    this.contactsService.startedEditing.next(contact);
  }
  //#endregion

  //#region Pagination, filtering, sorting
  onPageChange(page: PageEvent) {
    this.fetchContacts(page.pageIndex + 1, page.pageSize, this.searchKey, this.sorting.orderBy, this.sorting.sortDirection)
  }

  setPagemodel(res) {
    // retrieve paging headers
    let pagination = JSON.parse(res.headers.get('pagination')) as Paging;

    // update paging model
    // which reflects onto paginator in html
    this.paging.CurrentPage = pagination.CurrentPage;
    this.paging.PageSize = pagination.PageSize;
    this.paging.TotalCount = pagination.TotalCount;
  }

  applyFilter(searchKey) {
    this.filterSubject.next(searchKey);
  }

  handleFilter() {
    this.filterSubscription = this.filterSubject
    .pipe(debounceTime(500))
    .subscribe(searchKey => {
      this.searchKey = searchKey as string;
      this.fetchContacts(1, this.paging.PageSize, searchKey);
    })

  }

  onSortChange(event: Sort) {
    const split = event.active.split('.');
    const orderBy = split[split.length - 1]; // only last property
    const sortDirection = event.direction as  'asc' | 'desc';

    this.fetchContacts(this.paging.CurrentPage, this.paging.PageSize, this.searchKey, orderBy, sortDirection)
  }

  setSortModel(orderBy?, sortDirection?) {
    this.sorting.orderBy = orderBy;
    this.sorting.sortDirection = sortDirection;
  }
  //#endregion

  // Data fetch
  fetchContacts(page, pageSize, searchString?, orderBy?, sortDirection?: 'asc' | 'desc') {
    // fetch contacts for new page.pageIndex and page.pageSize (coming as parameter from event)
    this.contactsService.getContacts(page, pageSize, searchString, orderBy, sortDirection)
    .pipe(
      tap(res => console.log(res.body)),
      tap(res => this.dataSource = Object.assign([], res.body as unknown as MatTableDataSource<Contact[]>))
    )
    .subscribe(
      res => (this.setPagemodel(res), this.setSortModel(orderBy, sortDirection))
    );
  }

}