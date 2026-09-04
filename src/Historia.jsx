import React, { useState } from 'react';
import Movement from './Movement';
import Highlight from './Highlight';
import './Highlight.css';
import './Historia.css'; // Asegúrate de importar el nuevo archivo CSS

function Historia() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Movement numeral="Movimiento I" title="Historia" id="historia">
      {/* Párrafo 1: Se muestra siempre */}
      <p>
        Stiven David Pérez Pantoja, trombón bajo, es un destacado músico nariñense, oriundo de{' '}
        <Highlight>Puerres, Nariño</Highlight>, nacido en <Highlight>1999</Highlight> y perteneciente
        a una familia de músicos que cultivó en él, desde temprana edad, el amor y la pasión por el
        arte musical. Inició su formación bajo la tutoría de su padre, el maestro{' '}
        <Highlight>Álvaro Eduin Pérez Paz</Highlight>, y posteriormente continuó sus estudios
        profesionales en el programa Maestro en Música de la{' '}
        <Highlight>Universidad de Caldas</Highlight>, donde estuvo bajo la guía del maestro{' '}
        <Highlight>Jhon Wilson González</Highlight> y obtuvo reconocimiento meritorio por su
        concierto de grado.
      </p>

      {/* Párrafo 2: Se muestra siempre */}
      <p>
        A lo largo de su trayectoria ha fortalecido su formación artística mediante clases
        magistrales con reconocidos maestros de la escena nacional e internacional. Su talento y
        dedicación le han permitido participar en importantes escenarios y certámenes de música de
        Colombia y el exterior, consolidándose como uno de los intérpretes destacados del trombón
        bajo en el país.
      </p>

      {/* Bloque oculto */}
      <br></br>
      {isExpanded && (
        <div className="texto-oculto">
          <p>
            Su recorrido artístico comenzó a proyectarse desde muy joven. Entre{' '}
            <Highlight>2013 y 2015</Highlight> fue ganador de la convocatoria de estímulos del
            Ministerio de Cultura para integrar la{' '}
            <Highlight>Banda Sinfónica Juvenil de Colombia</Highlight>. Posteriormente, en{' '}
            <Highlight>2018</Highlight>, fue ganador del{' '}
            <Highlight>I Concurso Nacional de Trombón</Highlight>, en la categoría de trombón bajo,
            realizado en el marco de la cuarta edición del Festival Internacional de Trombón de
            Puerres, su ciudad natal. Ese mismo año obtuvo el primer lugar en la cuarta edición del{' '}
            <Highlight>Concurso Nacional de Jóvenes Intérpretes de la Orquesta Sinfónica de Caldas</Highlight>.
          </p>

          <p>
            En <Highlight>2019</Highlight> fue seleccionado como becario para participar en el
            programa de clases magistrales del{' '}
            <Highlight>Cartagena Music Festival</Highlight> y obtuvo los primeros lugares en los
            concursos Jóvenes Solistas y Gaspar Licciardone del{' '}
            <Highlight>Festival Internacional de Metales "Trombonanza"</Highlight>, realizado en Santa
            Fe, Argentina. Asimismo, fue ganador del{' '}
            <Highlight>I Concurso Universitario de Trombón SIT</Highlight>, desarrollado en el marco
            del Simposio Internacional de Trombón de la Universidad de Antioquia.
          </p>

          <p>
            En <Highlight>2020</Highlight> fue ganador de la convocatoria Músicos Temporales de la{' '}
            <Highlight>Orquesta Sinfónica Nacional de Colombia</Highlight>. En{' '}
            <Highlight>2022</Highlight> recibió el reconocimiento de Ganador por Fuera de Concurso y
            Mención de Honor en el concurso Jóvenes Solistas de la Banda Departamental del Valle y, ese
            mismo año, fue invitado como solista al Festival Internacional de Trombón de Puerres. Su
            trayectoria continuó con la selección para integrar la{' '}
            <Highlight>Serie de los Jóvenes Intérpretes del Banco de la República</Highlight>,
            participando en la Temporada Nacional de Conciertos 2023 y posteriormente en su gira
            nacional de 2024, con presentaciones en ciudades como Manizales, Pereira y Villavicencio.
            Su destacada trayectoria le permitió continuar como joven intérprete en la temporada 2025.
          </p>

          <p>
            En el ámbito orquestal y profesional, David se desempeñó durante cinco años, entre 2017 y
            2021, como trombonista bajo de la{' '}
            <Highlight>Banda Municipal de Manizales</Highlight>. También ha actuado como solista junto
            a esta agrupación, la Orquesta Sinfónica de Caldas y el Ensamble de Metales y Percusión de
            la Universidad de Caldas. Posteriormente, ejerció durante dos años como músico de planta,
            en el cargo de trombonista bajo, de la Orquesta Sinfónica de Caldas.
          </p>

          <p>
            Actualmente, Stiven David Pérez Pantoja hace parte de la{' '}
            <Highlight>Orquesta Sinfónica Nacional de Colombia</Highlight> como músico de planta,
            ocupando la plaza de trombón bajo, tras resultar ganador del concurso interno de solistas
            de esta agrupación. Paralelamente, es representante artístico de la prestigiosa marca de
            instrumentos de metal <Highlight href="https://seshires.com">
            S.E. Shires
            </Highlight>, perteneciente a Eastman Music
            Company. Su trayectoria refleja una constante búsqueda de excelencia artística, disciplina
            y compromiso con la interpretación del trombón bajo, llevando el talento musical de Nariño
            a importantes escenarios nacionales e internacionales.
          </p>
        </div>
      )}

      {/* Botón con clase CSS */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn-leer-mas"
      >
        {isExpanded ? '... Ver menos ▲' : '... Seguir leyendo ▼'}
      </button>

    </Movement>
  );
}

export default Historia;
