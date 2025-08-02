// Archivo de datos para los niveles del Escape Room.
// Cada nivel tiene un ID, un título, un color temático y un array de preguntas.
// Cada pregunta ahora incluye:
// - text: El texto de la pregunta.
// - options: Un array de 4 strings con las opciones de respuesta.
// - answer: La respuesta correcta, que debe coincidir con una de las opciones.
// - hint: Un mensaje de pista que se muestra si el usuario falla.

const levelsData = [
  {
    id: 1,
    title: 'Nivel 1: Violetta',
    themeColor: '#ff69b4', 
    questions: [
      {
        id: 1,
        text: '¿Cómo se llama el personaje que interpreta Martina Stoessel en Violetta?',
        options: ['Violetta', 'Ludmila', 'Francesca', 'Camila'],
        answer: 'Violetta',
        hint: 'Es el mismo nombre que el título de la serie. ¡Fácil!'
      },
      {
        id: 2,
        text: '¿Cuál es el nombre del café donde cantan en la serie?',
        options: ['On Beat', 'Music Time', 'Studio 21', 'Pop Star Cafe'],
        answer: 'On Beat',
        hint: 'Tiene un nombre en inglés relacionado con el ritmo musical.'
      }
    ]
  },
  {
    id: 2,
    title: 'Nivel 2: Sabrina Carpenter',
    themeColor: '#9370DB', 
    questions: [
      {
        id: 1,
        text: '¿Cuál es el primer álbum de estudio de Sabrina Carpenter?',
        options: ['Eyes Wide Open', 'Evolution', 'Singular Act I', 'Emails I Can’t Send'],
        answer: 'Eyes Wide Open',
        hint: 'Se lanzó en 2015. Las palabras son "Ojos" y "Abiertos" en inglés.'
      }
    ]
  },
  {
    id: 3,
    title: 'Nivel 3: Shrek',
    themeColor: '#228B22', 
    questions: [
      {
        id: 1,
        text: '¿Cómo se llama el mejor amigo de Shrek?',
        options: ['Burro', 'Gato con Botas', 'Jengibre', 'Lord Farquaad'],
        answer: 'Burro',
        hint: 'Es un animal parlanchín que no deja de hacer chistes.'
      },
      {
        id: 2,
        text: '¿En qué película aparece el Gato con Botas por primera vez?',
        options: ['Shrek 1', 'Shrek 2', 'Shrek Tercero', 'Shrek para siempre'],
        answer: 'Shrek 2',
        hint: 'Fue en la segunda película de la saga.'
      }
    ]
  },
  {
    id: 4,
    title: 'Nivel 4: Guardia Civil',
    themeColor: '#004225', 
    questions: [
      {
        id: 1,
        text: '¿En qué año se fundó la Guardia Civil de España?',
        options: ['1844', '1936', '1492', '1808'],
        answer: '1844',
        hint: 'Fue en el siglo XIX. Suma 1800 + 44.'
      }
    ]
  },
  {
    id: 5,
    title: 'Nivel 5: Granada',
    themeColor: '#B22222', 
    questions: [
      {
        id: 1,
        text: '¿Cómo se llama el mirador más famoso de Granada?',
        options: ['Mirador de San Nicolás', 'Mirador de San Cristóbal', 'Mirador de la Alhambra', 'Mirador de la Mezquita'],
        answer: 'Mirador de San Nicolás',
        hint: 'Está en el barrio del Albaicín y lleva el nombre de un santo.'
      }
    ]
  },
  {
    id: 6,
    title: 'Nivel 6: El arte de ser nosotros',
    themeColor: '#FFD700', 
    questions: [
      {
        id: 1,
        text: '¿Qué animal representa el capítulo que habla sobre la importancia de la paciencia?',
        options: ['Tortuga', 'León', 'Elefante', 'Cisne'],
        answer: 'Tortuga',
        hint: 'Es un animal conocido por su lentitud y larga vida.'
      }
    ]
  }
];

export default levelsData;