import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { EventService, Event } from '../event.service';



@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventservice: EventService,
    public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required]
    });

    if(data) {
       this.patchEventFormValue()
    }
  }

  patchEventFormValue() {
    this.eventForm.patchValue(this.data)
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      // console.log("Event Form Value ", this.eventForm.value)
      if(!this.data.hasOwnProperty('id')) {
        console.log("New Event Created")
        let eventFormObject = this.eventForm.value
        eventFormObject['id'] = this.generateUniqueId()
        eventFormObject['date'] = this.formatDate(eventFormObject['date'])
        console.log('Event Form Object ', eventFormObject)
        this.eventservice.addEvent(eventFormObject).subscribe((res:any) => {
          // console.log("Upload Successfullty ", res)
          alert('Event Created Successfully')
          this.dialogRef.close(this.eventForm.value);
        })
      } else {
        let eventFormObject = this.eventForm.value
        console.log("event form Object ", eventFormObject)
        eventFormObject['id'] = this.data.id
        eventFormObject['date'] = this.formatDate(eventFormObject['date'])
        console.log("event form Object ", eventFormObject)
        this.eventservice.updateEvent(eventFormObject).subscribe((res:any) => {
          alert('Event Updated Successfully')
          this.dialogRef.close(this.eventForm.value);
        })

      }
    }
  }

  generateUniqueId(): string {
    return uuidv4();
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  formatDate(date: any) {
    console.log("Date ", date, typeof(date))
    if(typeof(date) == 'object') {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    } else {
      date = date.split('T')[0]
      return date
    }
  }
}
