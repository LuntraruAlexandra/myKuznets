import React from 'react';
import  Grafic  from '../Components/Page2/grafic'; // Importă corect Grafic
import KuznetsForm from '../Components/Page2/KuznetsForm';


export function Page2() {
  return (
    <div>
      <h1>Pagina 2 - Graficul cu GDP și Emisii CO2</h1>
      {/* <Grafic />  */}
      <KuznetsForm/>
      {/* Aici trebuie să adaugi componenta Grafic */}

      {/* <div>
      <Grafic/>
      </div> */}

    </div>
  );
}
