import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Event, EventResult } from '@app/@models/event';
import { EventService } from '@app/@services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { untilDestroyed } from '@shared';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ event.title }}</h4>
    </div>
    <div class="modal-body">
      <p>{{ event.description }}</p>
      <p>{{ event.date | date: 'medium' }}</p>
      <p>{{ event.price }}</p>
      <p>{{ event.createdAt | date: 'medium' }}</p>
      <p>{{ event.updatedAt | date: 'medium' }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() event!: Event;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly notifier: NotifierService;
  isLoading = false;
  eventsResult!: EventResult;
  events: Event[] = [];
  countEvents = 0;
  currentPage = 1;
  searchForm!: FormGroup;
  sortOptions = [
    { value: 'title', text: 'Title' },
    { value: 'description', text: 'Description' },
    { value: 'price', text: 'Price' },
    { value: 'createdAt', text: 'Date Created' },
    { value: 'updatedAt', text: 'Date Updated' },
    { value: 'date', text: 'Date' },
  ];
  displayOptions = [
    { value: '5', text: '5' },
    { value: '10', text: '10' },
    { value: '20', text: '20' },
    { value: '40', text: '40' },
  ];
  selectedDisplayOption = 10;
  selectedSortOption = 'createdAt';
  selectedSortOptionDirection = 'asc';
  searchText = '';

  constructor(
    notifierService: NotifierService,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.notifier = notifierService;
    this.searchForm = this.formBuilder.group({
      search: ['', ''],
    });
  }

  async ngOnInit() {
    await this.loadEvents();
  }

  async loadEvents() {
    this.isLoading = true;
    this.eventsResult = await this.eventService.getAllEvents(
      (this.currentPage - 1) * this.selectedDisplayOption,
      this.selectedDisplayOption,
      this.selectedSortOption,
      this.selectedSortOptionDirection,
      this.searchText
    );
    this.isLoading = false;
    this.events = this.eventsResult.events;
    this.countEvents = this.eventsResult.count;
    this.events = Object.assign([], this.events);
  }
  get f() {
    return this.searchForm.controls;
  }
  async onSearch() {
    this.isLoading = true;
    this.searchText = this.searchForm.value.search;
    await this.loadEvents();
    this.isLoading = false;
  }
  async onChangeSortOption($event: any) {
    this.selectedSortOption = $event.target.value;
    await this.loadEvents();
  }
  async onClickSortOptionDirection(direction: string) {
    this.selectedSortOptionDirection = direction;
    await this.loadEvents();
  }
  async onChangeDisplayOption($event: any) {
    this.selectedDisplayOption = $event.target.value;
    await this.loadEvents();
  }
  async loadPage($event: any) {
    this.currentPage = $event;
    await this.loadEvents();
  }
  openModalEventDetails(eventId: string) {
    const event = _.find(this.events, function (event) {
      return event._id == eventId;
    });
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.event = event;
  }
  bookEvent(eventId: string) {
    this.eventService.bookEvent(eventId).subscribe(
      (credentials) => {
        this.notifier.notify('success', 'Booked Successful');
      },
      (error) => {
        this.notifier.notify('error', error);
      }
    );
  }
}
