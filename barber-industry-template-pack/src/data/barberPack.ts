/**
 * SAMPLE CONTENT — barber industry.
 *
 * Everything in this file is demonstration data. It is labelled "sample" in
 * the UI wherever money, trust or contact details are implied. No reviews,
 * ratings, awards, years of experience, or credentials are invented here:
 * `credentials` deliberately ships empty and templates show an honest empty
 * state until the customer adds real ones.
 */
import type { BusinessData, PhotoItem, ServiceItem } from '../types';
import { uid } from '../lib/utils';

import imgHeroChair from '../assets/samples/hero-chair.jpg';
import imgTools from '../assets/samples/tools-flatlay.jpg';
import imgInterior from '../assets/samples/interior-warm.jpg';
import imgRazor from '../assets/samples/razor-detail.jpg';
import imgProducts from '../assets/samples/products-shelf.jpg';
import imgPole from '../assets/samples/pole-street.jpg';
import imgCapes from '../assets/samples/cape-hooks.jpg';
import imgSink from '../assets/samples/sink-station.jpg';

export const SAMPLE_PHOTOS: PhotoItem[] = [
  { id: uid(), src: imgHeroChair, alt: 'Empty leather barber chair in a moody shop interior', sample: true },
  { id: uid(), src: imgTools, alt: 'Flat lay of clippers, scissors, comb and straight razor', sample: true },
  { id: uid(), src: imgInterior, alt: 'Sunlit barbershop interior with chairs and mirrors', sample: true },
  { id: uid(), src: imgRazor, alt: 'Straight razor and shaving brush on a folded towel', sample: true },
  { id: uid(), src: imgProducts, alt: 'Shelf of grooming products and folded towels', sample: true },
  { id: uid(), src: imgPole, alt: 'Barber pole on a shopfront wall at golden hour', sample: true },
  { id: uid(), src: imgCapes, alt: 'Barber capes and clippers hanging in a tidy station', sample: true },
  { id: uid(), src: imgSink, alt: 'Wash basin with rolled towels and eucalyptus', sample: true },
];

const svc = (category: string, name: string, price: string, description: string): ServiceItem => ({
  id: uid(), category, name, price, description,
});

export const SAMPLE_SERVICES: ServiceItem[] = [
  svc('Cuts', 'Signature Cut', 'R240', 'Consultation, precision cut, wash and finish styling.'),
  svc('Cuts', 'Skin Fade', 'R190', 'Zero-fade blended by clipper and foil, crisp line-up.'),
  svc('Cuts', 'Buzz & Shape', 'R120', 'One-length buzz with edged neckline and temples.'),
  svc('Cuts', 'Kids Cut (u12)', 'R110', 'Patient, parent-approved cuts for under-12s.'),
  svc('Beard', 'Beard Sculpt', 'R130', 'Shape, trim, line-up and conditioning beard oil.'),
  svc('Beard', 'Hot Towel Shave', 'R180', 'Classic straight-razor shave with hot towels.'),
  svc('Beard', 'Beard Trim & Line', 'R90', 'Quick tidy-up with razor-sharp edging.'),
  svc('Extras', 'Wash & Style', 'R90', 'Deep cleanse, scalp massage and blow-dry finish.'),
  svc('Extras', 'Grey Blending', 'R150', 'Subtle camouflage colour for a natural result.'),
];

export const SAMPLE_BUSINESS: BusinessData = {
  name: 'The Gilded Comb',
  tagline: 'Sharp cuts, honest prices, no rush.',
  description:
    'The Gilded Comb is a demonstration barbershop profile used to show what these designs look like with real content.\nReplace this story with your own: where you started, what your shop is known for, and how you look after your clients.',
  whatsapp: '27825550147',
  phone: '021 555 0147',
  email: 'hello@gildedcomb.co.za',
  address: '41 Jarvis Street',
  area: 'De Waterkant, Cape Town',
  hours: [
    { id: uid(), label: 'Mon – Fri', value: '08:30 – 18:00' },
    { id: uid(), label: 'Saturday', value: '08:00 – 16:00' },
    { id: uid(), label: 'Sunday', value: '09:00 – 13:00' },
  ],
  services: SAMPLE_SERVICES,
  credentials: [], // honest by design — see file header
};

/** Deep copy so edits never mutate the sample constants. */
export function freshSampleContent(): BusinessData {
  return JSON.parse(JSON.stringify(SAMPLE_BUSINESS)) as BusinessData;
}
