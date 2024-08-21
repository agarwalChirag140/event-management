import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public event: Event,
    private dialogRef: MatDialogRef<EventDetailsComponent> // Inject MatDialogRef
  ) {}

  // Method to close the dialog
  onCancel(): void {
    this.dialogRef.close();
  }
}

