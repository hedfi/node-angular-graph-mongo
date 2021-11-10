import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';

import { EventResult } from '@app/@models/event';
import { BOOK_EVENT, EVENTS } from '@app/@apollo/event';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private EventsQuery: QueryRef<
    { events: EventResult },
    { skip: number; limit: number; orderField: string; orderBy: string; searchText: string }
  >;

  constructor(private apollo: Apollo) {
    this.EventsQuery = this.apollo.watchQuery({
      query: EVENTS,
    });
  }

  async getAllEvents(
    skip = 0,
    limit = 10,
    orderField = 'createdAt',
    orderBy = 'asc',
    searchText = ''
  ): Promise<EventResult> {
    const result = await this.EventsQuery.refetch({ skip, limit, orderField, orderBy, searchText });
    return result.data.events;
  }
  bookEvent(eventId: string) {
    return this.apollo
      .mutate({
        mutation: BOOK_EVENT,
        variables: {
          eventId,
        },
      })
      .pipe(
        map((result) => {
          return of(result.data);
        })
      );
  }
}
