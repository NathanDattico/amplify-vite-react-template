import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [Appointments, setAppointments] = useState<Array<Schema["Appointment"]["type"]>>([]);

  useEffect(() => {
    client.models.Appointment.observeQuery().subscribe({
      next: (data) => setAppointments([...data.items]),
    });
  }, []);

  function createAppointment() {
    client.models.Appointment.create({ type: window.prompt("Appointment content") });
  }

  return (
    <main>
      <h1>My Appointments</h1>
      <ul>
        {Appointments.map((Appointment) => (
          <li key={Appointment.id}>{Appointment.type} {Appointment.appointmentDate ? (new Date(new Date(Appointment.appointmentDate).setHours(new Date(Appointment.appointmentDate).getHours()-1))).toLocaleString():null}</li>
        ))}
      </ul>
      
    </main>
  );
}

export default App;

/*<div>
        🥳 App successfully hosted. Try creating a new Appointment.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>*/