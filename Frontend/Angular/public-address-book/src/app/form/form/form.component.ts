import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ContactsService } from 'src/app/shared/contacts.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ContactsService) { }

  ngOnInit() {

    const address = this.formBuilder.group({
      city: '',
      street: '',
      houseNumber: ''
    })

    this.myForm = this.formBuilder.group({
      fullName: '',
      address: address,
      dateOfBirth: Date,
      phoneNumbers: []
    })
  }

  onSubmit(form: FormGroup){
    this.addContact(form);
  }

  addContact(form: FormGroup) {
    this.service.createContact(form.value).subscribe(res => {
      console.log(form.value);
    })
  }

}
