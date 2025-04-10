import { Unit } from '../../materials/entities/unit.entity';
import { Material } from '../../materials/entities/material.entity';
import { State } from '../../location/entities/state.entity';
import { City } from '../../location/entities/city.entity';
import { Project } from '../../projects/entities/project.entity';

export const statesSeed = [
  {
    name: 'SANTANDER',
  },
  {
    name: 'ANTIOQUIA',
  },
  {
    name: 'CUNDINAMARCA',
  },
  {
    name: 'VALLE DEL CAUCA',
  },
  {
    name: 'ATLÁNTICO',
  },
  {
    name: 'BOYACÁ',
  },
  {
    name: 'NARIÑO',
  },
  {
    name: 'TOLIMA',
  },
  {
    name: 'HUILA',
  },
  {
    name: 'META',
  },
];

export const citiesSeed = [
  {
    name: 'BUCARAMANGA',
  },
  {
    name: 'MEDELLÍN',
  },
  {
    name: 'BOGOTÁ',
  },
  {
    name: 'CALI',
  },
  {
    name: 'BARRANQUILLA',
  },
  {
    name: 'TUNJA',
  },
  {
    name: 'PASTO',
  },
  {
    name: 'IBAGUÉ',
  },
  {
    name: 'NEIVA',
  },
  {
    name: 'VILLAVICENCIO',
  },
];

export const unitsSeed = [
  {
    name: 'UNIDAD',
    description: 'UNIDAD DE MEDIDA BÁSICA',
  },
  {
    name: 'KILOGRAMO',
    description: 'UNIDAD DE MEDIDA DE PESO',
  },
  {
    name: 'METRO',
    description: 'UNIDAD DE MEDIDA DE LONGITUD',
  },
];

export const materialsSeed = [
  {
    code: 'CEM-001',
    description: 'CEMENTO GRIS 50KG',
    price: 25000,
  },
  {
    code: 'VAR-001',
    description: 'VARILLA DE ACERO 1/2 PULGADA',
    price: 35000,
  },
  {
    code: 'LAD-001',
    description: 'LADRILLO COMÚN',
    price: 850,
  },
  {
    code: 'ARE-001',
    description: 'ARENA FINA M3',
    price: 45000,
  },
  {
    code: 'PIN-001',
    description: 'PINTURA LÁTEX 20L',
    price: 120000,
  },
];

export const projectsSeed = [
  {
    name: 'CONJUNTO RESIDENCIAL LAS PALMAS',
    description: 'PROYECTO DE 100 APARTAMENTOS DE INTERÉS SOCIAL',
  },
  {
    name: 'CENTRO COMERCIAL PLAZA MAYOR',
    description: 'COMPLEJO COMERCIAL DE 5 NIVELES',
  },
];