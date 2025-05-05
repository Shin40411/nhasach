import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { _mock } from 'src/_mock';

import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';
import { CONFIG } from 'src/global-config';
import Autoplay from 'embla-carousel-autoplay';
import { primary } from 'src/theme';

// ----------------------------------------------------------------------

const renderLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    >
      <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
      <FloatTriangleDownIcon
        sx={{
          width: 30,
          height: 15,
          opacity: 0.24,
          position: 'static',
        }}
      />
    </Stack>

    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

export function HomeTestimonials({ sx, ...other }: BoxProps) {
  const carousel = useCarousel(
    {
      loop: true,
      align: 'start',
      slidesToShow: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
      },
      breakpoints: {
        [carouselBreakpoints.sm]: { slideSpacing: '24px' },
        [carouselBreakpoints.md]: { slideSpacing: '40px' },
        [carouselBreakpoints.lg]: { slideSpacing: '64px' },
      },
    },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  const renderDescription = () => (
    <SectionTitle
      caption="testimonials"
      title="Rumors are flying"
      txtGradient="that..."
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const horizontalDivider = (position: 'top' | 'bottom') => (
    <Divider
      component="div"
      sx={[
        (theme) => ({
          width: 1,
          opacity: 0.16,
          height: '1px',
          border: 'none',
          position: 'absolute',
          background: `linear-gradient(to right, transparent 0%, ${theme.vars.palette.grey[500]} 50%, transparent 100%)`,
          ...(position === 'top' && { top: 0 }),
          ...(position === 'bottom' && { bottom: 0 }),
        }),
      ]}
    />
  );

  const verticalDivider = () => (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={[
        (theme) => ({
          width: '1px',
          opacity: 0.16,
          border: 'none',
          background: `linear-gradient(to bottom, transparent 0%, ${theme.vars.palette.grey[500]} 50%, transparent 100%)`,
          display: { xs: 'none', md: 'block' },
        }),
      ]}
    />
  );

  const renderContent = () => (
    <Stack sx={{ position: 'relative', pt: { xs: 5, md: 8 } }}>
      {horizontalDivider('top')}

      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <Stack key={item.id} component={m.div} variants={varFade('in')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 100, height: 100 }} />
              <Stack sx={{ typography: 'subtitle1', mt: 1 }}>
                <Box component="span">{item.name}</Box>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Carousel>

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CarouselDotButtons
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons sx={{color: '#fff'}} {...carousel.arrows} options={carousel.options} />
      </Box>
    </Stack>
  );

  const renderNumber = () => (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      {horizontalDivider('top')}

      <Stack
        divider={verticalDivider()}
        sx={{ gap: 5, flexDirection: { xs: 'column', md: 'row' } }}
      >
        {[
          { label: 'Purchased order', value: 12.121 },
          { label: 'Happy customers', value: 160 },
          { label: 'Review rate', value: 4.9 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Purchased order' ? 'k+' : '+'}
                toFixed={item.label === 'Happy customers' ? 0 : 1}
                sx={[
                  (theme) => ({
                    fontWeight: 'fontWeightBold',
                    fontSize: { xs: 40, md: 64 },
                    lineHeight: { xs: 50 / 40, md: 80 / 64 },
                    fontFamily: theme.typography.fontSecondaryFamily,
                  }),
                ]}
              />
            </m.div>

            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Box
                component="span"
                sx={[
                  (theme) => ({
                    ...theme.mixins.textGradient(
                      `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                    ),
                    opacity: 0.4,
                    typography: 'h6',
                  }),
                ]}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {horizontalDivider('bottom')}
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[{ position: 'relative', backgroundColor: '#ff6c6b', py: 4, color: '#fff' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <MotionViewport>
        {renderLines()}

        <Container>
          {/* {renderDescription()} */}
          {renderContent()}
          {/* {renderNumber()} */}
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const mock_categories = [
  {
    id: 1,
    fullName: 'Nổi bật',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_1.png`,
  },
  {
    id: 2,
    fullName: 'Sách giáo khoa',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_2.webp`,
  },
  {
    id: 3,
    fullName: 'Sách bổ trợ',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_3.webp`,
  },
  {
    id: 4,
    fullName: 'Sách tham khảo',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_4.webp`,
  },
  {
    id: 5,
    fullName: 'TB mầm non',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_5.webp`,
  },
  {
    id: 6,
    fullName: 'TB HH',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_6.webp`,
  },
  {
    id: 7,
    fullName: 'TB THCS',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_7.webp`,
  },
  {
    id: 8,
    fullName: 'TB THPT',
    avatar: `${CONFIG.assetsDir}/assets/images/mock/categorise/coll_8.webp`,
  }
];

const createReview = (index: number) => {
  const category = mock_categories[index - 1];
  return {
    id: category?.id ?? `unknown-${index}`,
    name: category?.fullName ?? 'Không rõ',
    avatar: category?.avatar,
    rating: 5,
  };
};

const TESTIMONIALS = [
  {
    ...createReview(1)
  },
  {
    ...createReview(2)
  },
  {
    ...createReview(3)
  },
  {
    ...createReview(4)
  },
  {
    ...createReview(5)
  },
  {
    ...createReview(6)
  },
  {
    ...createReview(7)
  },
  {
    ...createReview(8)
  },
];
