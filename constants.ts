
import { StyleOption, AspectRatioOption } from './types';

export const ART_STYLES: StyleOption[] = [
  {
    id: 'photorealistic',
    name: 'Fotorrealista',
    description: 'Imagens que parecem fotografias reais.',
    promptSuffix: 'photorealistic, 8k, ultra-detailed, cinematic lighting, sharp focus',
    image: 'https://picsum.photos/seed/photo/400/400'
  },
  {
    id: 'digital_art',
    name: 'Arte Digital',
    description: 'Estilo de ilustração moderna e vibrante.',
    promptSuffix: 'digital painting, highly expressive, concept art, trending on artstation',
    image: 'https://picsum.photos/seed/digital/400/400'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futurista com luzes neon e sombras profundas.',
    promptSuffix: 'Cyberpunk, neon lighting, highly reflective surfaces, futuristic city vibe',
    image: 'https://picsum.photos/seed/cyber/400/400'
  },
  {
    id: 'pixel_art',
    name: 'Pixel Art',
    description: 'Estilo de videogame clássico de 16 bits.',
    promptSuffix: 'Pixel Art, 16-bit, vibrant colors, retro gaming aesthetic',
    image: 'https://picsum.photos/seed/pixel/400/400'
  },
  {
    id: 'watercolor',
    name: 'Aquarela',
    description: 'Suave, artístico com pinceladas visíveis.',
    promptSuffix: 'Watercolor painting, expressive brushstrokes, bleeding colors, textured paper',
    image: 'https://picsum.photos/seed/water/400/400'
  },
  {
    id: 'pencil_sketch',
    name: 'Esboço a Lápis',
    description: 'Desenho detalhado em grafite sobre papel.',
    promptSuffix: 'Pencil sketch, detailed graphite drawing, cross-hatching, hand-drawn',
    image: 'https://picsum.photos/seed/sketch/400/400'
  },
  {
    id: '3d_render',
    name: 'Renderização 3D',
    description: 'Estilo de animação moderna ou argila.',
    promptSuffix: '3D render, octane render, soft lighting, claymation style, cute aesthetics',
    image: 'https://picsum.photos/seed/3d/400/400'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Ilustração detalhada de estilo japonês.',
    promptSuffix: 'Anime style, highly detailed character illustration, cel shaded, vibrant',
    image: 'https://picsum.photos/seed/anime/400/400'
  }
];

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '1:1', label: 'Quadrado', ratio: '1:1', icon: 'M4 4h16v16H4z' },
  { id: '16:9', label: 'Widescreen', ratio: '16:9', icon: 'M2 6h20v12H2z' },
  { id: '9:16', label: 'Retrato', ratio: '9:16', icon: 'M6 2h12v20H6z' },
  { id: '4:3', label: 'Clássico', ratio: '4:3', icon: 'M3 5h18v14H3z' },
  { id: '3:4', label: 'Livro', ratio: '3:4', icon: 'M5 3h14v18H5z' },
];
