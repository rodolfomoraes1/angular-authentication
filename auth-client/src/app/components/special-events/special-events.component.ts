import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventService} from '../../services/event/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getSpecialEvents()
      .then(
      res => this.specialEvents = res
    ).catch(
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500 || err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

}
