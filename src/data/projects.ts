import type { Project } from '../types/project.types';
import ImdbImage from '../images/imdbImage.png'
import MyGymImage from '../images/MyGymImage.png'
import WeatherImage from '../images/WheatherImage.png'
import portfolioImage from '../images/portfolioImage.png'
import hackImage from '../images/hackImage.png'
import sphereImage from '../images/sphereimage.png'
import changingCurrency from '../images/changingCurrency.png'
// Replace these demo entries with your own projects, screenshots and URLs.
export const projects: Project[] = [
  {
    id: 'my-gym',
    title: 'My Gym',
    category: 'Dashboard / PWA / underdevelope',
    year: '2026 /not relesed yet',
    description: 'A gym management platform designed to simplify membership tracking, workout and diet planning, trainer management.',
    technologies: ['React', 'TypeScript', 'Tailwind','Vite','CSS Modules'],
    image: MyGymImage,
    accent: '#b7ff6a',
    liveUrl: '#',
    sourceUrl: 'https://github.com/mojitaher/gym-enterprise',
  },
  {
    id: 'IMDB',
    title: 'IMDB',
    category: 'Product',
    year: '2023',
    description: 'A movie discovery platform where users can explore films',
    technologies: ['React', 'Tailwind', 'Vite'],
    image: ImdbImage,
    accent: '#ffb46a',
    liveUrl: 'https://imdb-psi-amber.vercel.app/',
    sourceUrl: 'https://github.com/mojitaher/IMDB',
  },
  {
    id: 'weather',
    title: 'whether',
    category: 'WebApi / Web',
    year: '2025',
    description: 'A responsive weather application that provides real-time weather information,',
    technologies: ['React', 'Vite', 'CSS Modules','Tailwind'],
    image: WeatherImage,
    accent: '#86c9ff',
    liveUrl: '#',
    sourceUrl: 'https://github.com/mojitaher/weather',
  },
  {
    id: 'changingCurrency',
    title: 'changingCurrency',
    category: 'logical',
    year: '2025',
    description: 'that was for interview and it is for change currency',
    technologies: ['TypeScript', 'Next.js', 'Tailwind'],
    image: changingCurrency,
    accent: '#d5a6ff',
    liveUrl: '#',
    sourceUrl: 'https://github.com/mojitaher/changingCurrency',
  },
  {
    id: 'my portfolio',
    title: 'my portfolio',
    category: 'portfolio',
    year: '2025',
    description: 'this is my portfolio to interduce myself hope you like it',
    technologies: [ 'Next.js', 'TypeScript','Tailwind','Gsap'],
    image: portfolioImage,
    accent: '#ff8e9e',
    liveUrl: 'https://myinterview-moji.vercel.app/',
    sourceUrl: '#',
  },
  {
    id: 'hacker',
    title: 'hacker',
    category: 'hack',
    year: '2023',
    description: 'pure html and Css For greater mastery',
    technologies: ['Html', 'Css'],
    image: hackImage,
    accent: '#f7d66b',
    liveUrl: '#',
    sourceUrl: 'https://github.com/mojitaher/hacker',
  },
  {
    id: 'project sphere',
    title: 'project sphere',
    category: 'Product UI',
    year: '2026',
    description: 'A sphere for showing my projects.',
    technologies: ['TypeScript', 'CSS Modules', 'React','Gsap'],
    image: sphereImage,
    accent: '#7df0d0',
    liveUrl: '#',
    sourceUrl: 'https://github.com/mojitaher/my-portfolio-sphere',
  },
 
];