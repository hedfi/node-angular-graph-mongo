export interface Event {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}
export interface EventResult {
  count: number;
  events: Event[];
}
export interface CreateEvent {
  createEvent: Event;
}
export interface DeleteEvent {
  deleteEvent: Event;
}
export interface EditEvent {
  editEvent: Event;
}
