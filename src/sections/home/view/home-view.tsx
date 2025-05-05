import Stack from '@mui/material/Stack';

import { BackToTopButton } from 'src/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { NhaSachView } from 'src/sections/nhasach/view';
import { HomeHero } from '../home-hero';
// import { HomeFAQs } from '../home-faqs';
import { HomeZoneUI } from '../home-zone-ui';

import { HomeFAQs } from '../home-faqs';
import { HomeMinimal } from '../home-minimal';
// import { HomePricing } from '../home-pricing';
// import { HomeForDesigner } from '../home-for-designer';
import { HomeTestimonials } from '../home-testimonials';
// import { HomeIntegrations } from '../home-integrations';
import { HomeAdvertisement } from '../home-advertisement';
import { HomeHugePackElements } from '../home-hugepack-elements';
import { HomeHighlightFeatures } from '../home-highlight-features';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton />

      <BackToTopButton />

      <HomeHugePackElements />
      {/* <HomeHero /> */}
      {/* <HomeMinimal /> */}

      {/* <HomeHighlightFeatures /> */}

      {/* <HomeAdvertisement /> */}
      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        {/* <HomeForDesigner /> */}

        {/* <HomeIntegrations /> */}

        {/* <HomePricing /> */}

        <HomeTestimonials />

        {/* <HomeZoneUI /> */}

        <NhaSachView />
        {/* <HomeFAQs /> */}
      </Stack>
    </>
  );
}
