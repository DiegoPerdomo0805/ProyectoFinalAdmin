import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
}

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    { id: 1, title: 'Laptop fails to boot', status: 'open' },
    { id: 2, title: 'VPN access request', status: 'in_progress' }
  ];
  private nextId = this.tickets.length + 1;

  create(createTicketDto: CreateTicketDto): Ticket {
    const ticket: Ticket = {
      id: this.nextId++,
      title: createTicketDto.title,
      status: createTicketDto.status ?? 'open'
    };
    this.tickets.push(ticket);
    return ticket;
  }

  findAll(): Ticket[] {
    return this.tickets;
  }

  findOne(id: number): Ticket {
    const ticket = this.tickets.find((item) => item.id === id);
    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} not found`);
    }
    return ticket;
  }

  update(id: number, updateTicketDto: UpdateTicketDto): Ticket {
    const ticket = this.findOne(id);
    if (updateTicketDto.title !== undefined) {
      ticket.title = updateTicketDto.title;
    }
    if (updateTicketDto.status !== undefined) {
      ticket.status = updateTicketDto.status;
    }
    return ticket;
  }

  remove(id: number): void {
    const index = this.tickets.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Ticket ${id} not found`);
    }
    this.tickets.splice(index, 1);
  }
}
