import { GetServerSideProps } from 'next';

type TicketStatus = 'open' | 'in_progress' | 'closed';

interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
}

interface HomeProps {
  tickets: Ticket[];
}

export default function Home({ tickets }: HomeProps) {
  return (
    <main style={{ fontFamily: 'system-ui', padding: '2rem' }}>
      <h1>IT Service Requests</h1>
      <p>Simple dashboard showing current support tickets.</p>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> — {ticket.status}
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3000/tickets');
  const tickets: Ticket[] = await response.json();
  return { props: { tickets } };
};
