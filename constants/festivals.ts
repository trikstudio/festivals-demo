export type Festival = {
  id: string;
  name: string;
  location: string;
  dates: string;
  price: string;
  lineup: string[];
  about: string;
  highlights: string[];
};

export const festivals: Festival[] = [
  {
    id: 'sunset',
    name: 'Sunset Sounds',
    location: 'Lisbon, Portugal',
    dates: 'June 14–16',
    price: '€129 weekend pass',
    lineup: ['Nova Lane', 'Drift City', 'Harbor Lights', 'Luna Vale'],
    about: 'Beachfront stages, sunset sets, and late-night DJ tents.',
    highlights: ['3 beach stages', 'Local food market', 'Sunset DJ sessions'],
  },
  {
    id: 'forest',
    name: 'Forest Echoes',
    location: 'Ghent, Belgium',
    dates: 'July 5–7',
    price: '€99 weekend pass',
    lineup: ['Moss & Moon', 'The Pines', 'Amber Fox', 'Quiet Current'],
    about: 'Indie-focused festival in a wooded park with art installations.',
    highlights: ['Acoustic grove', 'Art trail', 'Silent disco'],
  },
  {
    id: 'citypulse',
    name: 'City Pulse',
    location: 'Rotterdam, Netherlands',
    dates: 'August 2–3',
    price: '€69 day ticket',
    lineup: ['Metroline', 'Night Arcade', 'Pulse 88', 'Glass Avenue'],
    about: 'Urban stages, street food, and pop/electronic headliners.',
    highlights: ['Rooftop stage', 'Street food court', 'Late night sets'],
  },
  {
    id: 'meadow',
    name: 'Meadow Folk',
    location: 'Cork, Ireland',
    dates: 'September 12–14',
    price: '€79 weekend pass',
    lineup: ['Willow & Wire', 'North Road', 'Tallgrass', 'June Harper'],
    about: 'Acoustic sets, storytelling tents, and local craft market.',
    highlights: ['Story circle', 'Craft market', 'Family-friendly zone'],
  },
  {
    id: 'aurora',
    name: 'Aurora Beats',
    location: 'Reykjavik, Iceland',
    dates: 'October 18–19',
    price: '€149 weekend pass',
    lineup: ['Polar Tide', 'Neon Fjord', 'Skyline Static', 'Glow Atlas'],
    about: 'Late-night electronic festival with indoor venues and visuals.',
    highlights: ['Indoor arenas', 'Light show', 'Afterhours lounge'],
  },
];
