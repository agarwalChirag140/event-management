import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventDetailsComponent } from '../event-details/event-details.component'; // Import Event Details Component

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  openCreateEventDialog(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.getAllEvents();
      }
    });
  }

  deleteEvent(id: any) {
    this.eventService.deleteEvent(id).subscribe((res: any) => {
      alert('Event Deleted Successfully');
      this.getAllEvents();
    });
  }

  getEvent(id: any) {
    this.eventService.getEvent(id).subscribe((res: any) => {
      this.editForm(res);
    });
  }

  editForm(res: any) {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '900px',
      data: res
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log("Res ", res)
      if (res) {
        this.getAllEvents();
      }
    });
  }

  viewEventDetails(event: Event) {
    const dialogRef = this.dialog.open(EventDetailsComponent, {
      width: '600px',
      data: event
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      // Handle any actions after viewing details, if needed
    });
  }
}

