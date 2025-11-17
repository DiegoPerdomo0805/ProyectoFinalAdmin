import { TicketStatus } from '../tickets.service';

export class UpdateTicketDto {
  title?: string;
  status?: TicketStatus;
}
