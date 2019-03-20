import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getEvents().then(
      res => this.events = res
    ).catch(
      err => console.log(err)
    );
  }

}
