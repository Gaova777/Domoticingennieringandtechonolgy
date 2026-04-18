import { Hero } from '@/components/home/hero';
import { TrustStrip } from '@/components/home/trust-strip';
import { ServicesGrid } from '@/components/home/services-grid';
import { ConfiguradorTeaser } from '@/components/home/configurador-teaser';
import { FeaturedProducts } from '@/components/home/featured-products';
import { WhyUs } from '@/components/home/why-us';
import { CameraComparator } from '@/components/home/camera-comparator';
import { Testimonials } from '@/components/home/testimonials';
import { MapCta } from '@/components/home/map-cta';
import { LocalBusinessJsonLd } from '@/components/home/local-business-jsonld';

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <ConfiguradorTeaser />
      <FeaturedProducts />
      <WhyUs />
      <CameraComparator />
      <Testimonials />
      <MapCta />
    </>
  );
}
