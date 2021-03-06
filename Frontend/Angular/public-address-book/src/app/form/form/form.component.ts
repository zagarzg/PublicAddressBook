import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ContactsService } from 'src/app/shared/contacts.service';
import { Contact } from 'src/app/shared/contact.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  myForm: FormGroup;

  @Output() createOrUpdateEvent = new EventEmitter();

  subscription: Subscription;
  editMode = false;
  editedContactId: string;
  editedContact: Contact;

  constructor(private formBuilder: FormBuilder, public service: ContactsService) { }

  ngOnInit() {

    this.subscription = this.service.startedEditing
      .subscribe(
        (contact: Contact) => {
          this.editedContactId = contact.id;
          this.editMode = true;
          
          this.myForm.setValue({
            id: contact.id,
            fullName: contact.fullName,
            address: contact.address,
            dateOfBirth: contact.dateOfBirth,
            phoneNumbers: contact.phoneNumbers
          })
        }
      );

    const address = this.formBuilder.group({
      city: '',
      street: '',
      houseNumber: ''
    })

    this.myForm = this.formBuilder.group({
      id: '',
      fullName: '',
      address: address,
      dateOfBirth: Date,
      phoneNumbers: []
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: FormGroup){

    if(!this.editMode) {
      this.service.createContact(form.value).pipe(take(1)).subscribe(res =>
        this.createOrUpdateEvent.emit(res as Contact));
      console.log(this.editMode)  
    }
    else {
      this.service.updateContact(form.value).pipe(take(1)).subscribe(res => 
        this.createOrUpdateEvent.emit(res as Contact));
      console.log(this.editMode)    
    }
    
    form.reset();
    this.editMode = false;
  }
  
}
