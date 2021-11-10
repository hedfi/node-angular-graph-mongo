import { gql } from 'apollo-angular';

const EVENTS = gql`
  query {
    events {
      count
      events {
        _id
        title
        description
        price
        date
        creator
        createdAt
        updatedAt
      }
    }
  }
`;
const BOOK_EVENT = gql`
  mutation bookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
    }
  }
`;
export { EVENTS, BOOK_EVENT };
