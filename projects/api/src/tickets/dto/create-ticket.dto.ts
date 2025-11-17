import { TicketStatus } from '../tickets.service';

export class CreateTicketDto {
  title!: string;
  status?: TicketStatus;
}
