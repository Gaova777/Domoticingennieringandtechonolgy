import { Hero } from '@/components/home/hero';
import { ServicesGrid } from '@/components/home/services-grid';
import { FeaturedProducts } from '@/components/home/featured-products';
import { ConfiguradorTeaser } from '@/components/home/configurador-teaser';
import { Testimonials } from '@/components/home/testimonials';
import { MapCta } from '@/components/home/map-cta';
import { LocalBusinessJsonLd } from '@/components/home/local-business-jsonld';

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <FeaturedProducts />
      <ServicesGrid />
      <ConfiguradorTeaser />
      <Testimonials />
      <MapCta />
    </>
  );
}
