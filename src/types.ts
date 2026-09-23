export interface ComponentBlueprint {
  id: string;
  name: string;
  category: 'Hero' | 'Navigation' | 'Loader' | 'Scroll' | 'Footer' | 'Dashboard' | 'Product' | 'Generative' | 'Typography' | 'Shader' | 'Form' | 'Spatial';
  batch: string;
  techStack: string[];
  aestheticVibe: string;
  interactionBlueprint: string;
  description: string;
  codeSnippet: string;
  tags: string[];
}

export type AestheticFilter = 
  | 'ALL'
  | 'CHROMATIC'
  | 'NEO_BRUTALIST'
  | 'CYBERPUNK'
  | 'LUXURY_EDITORIAL'
  | 'WEBGL_3D';

export type TechFilter = 
  | 'ALL'
  | 'THREE_JS'
  | 'CANVAS_2D'
  | 'MOTION'
  | 'KINETIC_TYPE';
