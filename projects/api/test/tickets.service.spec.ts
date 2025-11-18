import { TicketsService } from '../src/tickets/tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(() => {
    service = new TicketsService();
  });

  it('create() should add a new ticket and return it with an id', () => {
    const ticket = service.create({
      title: 'Ticket A',
      status: 'open',
    });

    expect(ticket).toHaveProperty('id');
    expect(ticket.title).toBe('Ticket A');
    expect(ticket.status).toBe('open');
  });

  it('findAll() should return an array with the created tickets', () => {
    // initial tickets (your service seeds some by default)
    const initialCount = service.findAll().length;

    service.create({ title: 'Ticket A', status: 'open' });
    service.create({ title: 'Ticket B', status: 'in_progress' });

    const tickets = service.findAll();

    expect(Array.isArray(tickets)).toBe(true);
    expect(tickets.length).toBe(initialCount + 2);
  });

  it('findOne() should return the correct ticket by id', () => {
    const created = service.create({
      title: 'Ticket C',
      status: 'open',
    });

    const found = service.findOne(created.id);

    expect(found).toBeDefined();
    expect(found?.id).toBe(created.id);
    expect(found?.title).toBe('Ticket C');
  });
});
