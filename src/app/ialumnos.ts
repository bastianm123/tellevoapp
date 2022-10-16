export interface RespuestaAlumnos {
    alumnos: Alumno[];
  }
  
  export interface Alumno {
    id: string;
    nombre: string;
    username: string;
    password: string;
  }