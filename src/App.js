import React from "react";
import Home from "./componentes/Home/Home";
import Admin from "./componentes/Administrativos/Administrativos";
import Paciente from "./componentes/Paciente/Paciente";
import Medico from "./componentes/Medicos/Medico";
import Farmaceutico from "./componentes/Farmaceutico/Farmaceutico";
import InicioAdmin from "./componentes/Administrativos/InicioAdmin";
import InicioMed from "./componentes/Medicos/InicioMedi";
import InicioFarma from "./componentes/Farmaceutico/InicioFarma";
import InicioPaci from "./componentes/Paciente/InicioPaci";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prescripc from "./componentes/Prescripcion/Prescripcion";
import ConsulAgenda from "./componentes/Medicos/ConsultarAgenda";
import ActualHistor from "./componentes/Medicos/ActualHistor";
import AgendarCita from "./componentes/Administrativos/AgendarCita";
import AgendaMedicos from "./componentes/Administrativos/ConsultarAgendaMed";
import CrearAgenda from "./componentes/Administrativos/CrearAgenda";
import RegistrarMedi from "./componentes/Administrativos/RegistrarMedi";
import RegFarmacias from "./componentes/Administrativos/RegFarmacias";
import ConsulFarmacias from "./componentes/Administrativos/ConsulFarma";
import ConsulMedi from "./componentes/Administrativos/ConsulMedi";
import ConsulCita from "./componentes/Paciente/ConsulCita";
import Compra from "./componentes/Paciente/Compra";
import ConsulPres from "./componentes/Paciente/ConsulPres";
import ConsulHisto from "./componentes/Paciente/ConsulHisto";
import RegLote from "./componentes/Farmaceutico/RegLote";
import ConsulMedicamento from "./componentes/Farmaceutico/ConsulMedicamento";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/paciente" component={Paciente} />
        <Route path="/medico" component={Medico} />
        <Route path="/farmaceutico" component={Farmaceutico} />
        <Route path="/inicioAdmin" component={InicioAdmin} />
        <Route path="/Administrativos" component={Admin} />
        <Route path="/admin" component={Admin} />
        <Route path="/inicioMedi" component={InicioMed} />
        <Route path="/InicioFarma" component={InicioFarma} />
        <Route path="/InicioPaci" component={InicioPaci} />
        <Route path="/Prescripcion" component={Prescripc} />
        <Route path="/ConsultarAgenda" component={ConsulAgenda} />
        <Route path="/ActualHistor" component={ActualHistor} />
        <Route path="/AgendarCita" component={AgendarCita} />
        <Route path="/ConsultarAgendaMed" component={AgendaMedicos} />
        <Route path="/CrearAgenda" component={CrearAgenda} />
        <Route path="/RegistrarMedi" component={RegistrarMedi} />
        <Route path="/regFarmacias" component={RegFarmacias} />
        <Route path="/consulFarma" component={ConsulFarmacias} />
        <Route path="/consulMedi" component={ConsulMedi} />
        <Route path="/ConsulCita" component={ConsulCita} />
        <Route path="/Compra" component={Compra} />
        <Route path="/ConsulPres" component={ConsulPres} />
        <Route path="/ConsulHisto" component={ConsulHisto} />
        <Route path="/RegLote" component={RegLote} />
        <Route path="/ConsulMedicamento" component={ConsulMedicamento} />
      </Switch>
    </Router>
  );
}

export default App;

