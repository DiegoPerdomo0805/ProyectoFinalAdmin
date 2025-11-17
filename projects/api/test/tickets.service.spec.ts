import { TicketsService } from '../src/tickets/tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(() => {
    service = new TicketsService();
  });

  it('create() should add a new ticket and return it with an id', () => {
    const ticket = service.create({ title: 'Test ticket', status: 'open' });

    expect(ticket.id).toBeDefined();
    expect(ticket).toMatchObject({
      title: 'Test ticket',
      status: 'open'
    });
  });

  it('findAll() should return an array with the created tickets', () => {
    service.create({ title: 'Ticket A', status: 'open' });
    service.create({ title: 'Ticket B', status: 'in_progress' });

    const tickets = service.findAll();

    expect(Array.isArray(tickets)).toBe(true);
    expect(tickets).toHaveLength(2);
  });

  it('findOne() should return the correct ticket by id', () => {
    const created = service.create({ title: 'Lookup ticket', status: 'closed' });

    const found = service.findOne(created.id);

    expect(found).toEqual(created);
  });
});
