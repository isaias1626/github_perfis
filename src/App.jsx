import { useState } from "react";

import Perfil from "./components/Perfil/index.jsx";
import Formulario from "./components/Formulario/index.jsx";
import ReposList from "./components/ReposList/index.jsx";


function App() {
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState(' ');

  return (
    <>
    <div className="divInput">
      <h4>Insira seu Usuario:</h4>
      <input className="inserirUsuario" placeholder="Insira seu usuario do Github" type="text" onBlur={(e) => setNomeUsuario(e.target.value)} />
    </div>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}
      
      {/* {formularioEstaVisivel && (
        <Formulario />
      )}

      <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type="button"> toggle form</button> */}
    </>
  )
}

export default App
