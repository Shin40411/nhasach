import type { MotionValue } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { useRef, useState } from 'react';
import { useClientRect } from 'minimal-shared/hooks';
import { m, useSpring, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport, varScale } from 'src/components/animate';

import { SectionTitle, SectionCaption } from './components/section-title';
import { Card } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { _carouselsMembers, _socials } from 'src/_mock';
import { FloatLine, FloatTriangleLeftIcon } from './components/svg-elements';

import { Image } from 'src/components/image';
import { Carousel, CarouselArrowFloatButtons, useCarousel } from 'src/components/carousel';
import DanhSachSGK from '../../_mock/_map/DanhSachSGK.json';
import { kebabCase } from 'es-toolkit';
import { kebabCaseUnQuoteVn } from 'src/utils/kebabVN';
import { getInitials } from 'src/utils/getInitials';
// ----------------------------------------------------------------------

type MemberCardProps = {
  member: (typeof _carouselsMembers)[number];
};

type BookItem = {
  "Môn học": string;
  "Tên sách": string;
  "Lớp": string;
  "Tác giả": string;
};

const thumbnailBook = (ten: string, mon: string, lop: string) => {
  let titleComponent = '';
  if (ten) {
    titleComponent = kebabCaseUnQuoteVn(ten.replace('.', ''));
  }

  let subjectComponent = '';
  if (mon) {
    subjectComponent = getInitials(mon);
  }

  let gradeComponent = '';
  let gradeExplodeComponent = '';
  if (lop.includes('Lớp ', 0)) {
    gradeComponent = lop;
    gradeExplodeComponent = lop.replace('Lớp ', '').split(', ').join('');;
  } else {
    gradeComponent = `Lớp ${lop}`;
    gradeExplodeComponent = lop.split(', ').join('');
  }

  const BookDir = `${gradeComponent}/thumbnail_stk${gradeExplodeComponent}_${subjectComponent}${gradeExplodeComponent}_${titleComponent}.png`;

  return `${CONFIG.assetsDir}/assets/Thumbnail/${BookDir}`;
};

const renderLines = () => (
  <>
    <FloatTriangleLeftIcon sx={{ top: 80, left: 80, opacity: 0.4 }} />
    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

const renderImage = () => (
  <Box
    component={m.img}
    variants={{ ...varScale('in'), initial: { scale: 0.8, opacity: 0 } }}
    alt="Integration"
    src={`${CONFIG.assetsDir}/assets/illustrations/illustration-integration.webp`}
    sx={{ width: 720, objectFit: 'cover', aspectRatio: '1/1' }}
  />
);

export function HomeHugePackElements({ sx, ...other }: BoxProps) {
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  const selectedSubjects = ['Tiếng Anh', 'Ngữ Văn', 'Toán học'];
  const uniqueBooks: BookItem[] = selectedSubjects.map((subject) => DanhSachSGK.find((item) => item['Môn học'] === subject)).filter((item): item is BookItem => Boolean(item));

  return (
    <Box
      component="section"
      sx={[
        {
          position: 'relative',
          backgroundImage: `url(${CONFIG.assetsDir}/assets/background/carouselbg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${CONFIG.assetsDir}/assets/background/whitewall.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <MotionViewport>
        {renderLines()}

        <Container sx={{ position: 'relative', zIndex: 1, textAlign: { xs: 'center', md: 'left' }, height: '100%' }}>
          <Grid container rowSpacing={{ xs: 3, md: 0 }} columnSpacing={{ xs: 0, md: 8 }}>
            <Grid sx={{ display: 'flex', alignItems: 'stretch' }} size={{ xs: 12, md: 6, lg: 7 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', height: '100%', py: 4 }}>
                <Box
                  sx={{
                    flexGrow: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <SectionTitle title="Nhà sách trực tuyến" txtGradient="this book" />
                </Box>
                <m.div variants={varFade('inUp', { distance: 24 })}>
                  <Box
                    sx={{
                      mt: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 3,
                      width: '100%',
                    }}
                  >
                    {[['stk', 'Sách tham khảo'], ['tbgd', 'Thiết bị giáo dục'], ['sgk', 'Sách giáo khoa']].map(
                      ([key, alt]) => (
                        <Box
                          key={key}
                          component="img"
                          src={url_imagecard(key)}
                          alt={alt}
                          sx={{
                            width: { xs: '100%', sm: 160, md: 180 },
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            cursor: 'pointer',
                          }}
                        />
                      )
                    )}
                  </Box>
                </m.div>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <Box sx={{ position: 'relative' }}>
                <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

                <Carousel carousel={carousel} sx={{ px: 0.5 }}>
                  {uniqueBooks
                    .map((item) => (
                      <Box
                        key={`${item["Môn học"]}-${item['Tên sách']}`}
                        component={m.div}
                        variants={varFade('in')}
                        sx={{ py: { xs: 12, md: 12 } }}
                      >
                        <MemberCard
                          member={{
                            id: item["Môn học"],
                            name: item['Tên sách'],
                            role: item['Lớp'],
                            avatarUrl: thumbnailBook(item['Tên sách'], item["Môn học"], item["Lớp"]),
                          }}
                        />
                      </Box>
                    ))}
                </Carousel>
              </Box>
              {/* </m.div> */}
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
      {/* <ScrollableContent /> */}
    </Box>
  );
}

// ----------------------------------------------------------------------

function ScrollableContent() {
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRect = useClientRect(containerRef);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRect = useClientRect(scrollRef);

  const [startScroll, setStartScroll] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef });

  const physics = { damping: 16, mass: 0.16, stiffness: 50 };

  const scrollRange = (-scrollRect.scrollWidth + containerRect.width) * (isRtl ? -1 : 1);

  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollRange]), physics);
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], [scrollRange, 0]), physics);

  const background: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      theme.vars.palette.background.default,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.neutral,
      theme.vars.palette.background.default,
    ]
  );

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest !== 0 && latest !== 1) {
      setStartScroll(true);
    } else {
      setStartScroll(false);
    }
  });

  return (
    <ScrollRoot ref={containerRef} sx={{ height: scrollRect.scrollWidth, minHeight: '100vh' }}>
      <ScrollContainer style={{ background }} data-scrolling={startScroll}>
        <ScrollContent ref={scrollRef} layout transition={{ ease: 'linear', duration: 0.25 }}>
          <ScrollItem
            style={{ x: x1 }}
            sx={{
              height: { xs: 160, md: 180 },
              width: { xs: '600%', md: '400%' },
              backgroundImage: `url(${CONFIG.assetsDir}/assets/images/home/bundle-light-1.webp)`,
              ...theme.applyStyles('dark', {
                backgroundImage: `url(${CONFIG.assetsDir}/assets/images/home/bundle-dark-1.webp)`,
              }),
            }}
          />
          <ScrollItem
            style={{ x: x2 }}
            sx={{
              height: { xs: 400, md: 480 },
              width: { xs: '600%', md: '400%' },
              backgroundImage: `url(${CONFIG.assetsDir}/assets/images/home/bundle-light-2.webp)`,
              ...theme.applyStyles('dark', {
                backgroundImage: `url(${CONFIG.assetsDir}/assets/images/home/bundle-dark-2.webp)`,
              }),
            }}
          />
        </ScrollContent>
      </ScrollContainer>
    </ScrollRoot>
  );
}

const url_imagecard = (type: string) => {
  return `${CONFIG.assetsDir}/assets/images/mock/categorise/${type}.webp`;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <Card>
      {/* <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5, mx: 2 }}>
        {member.name}
      </Typography>
      {_socials.map((social) => (
        <IconButton key={social.label}>
          {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
          {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
          {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
          {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
        </IconButton>
      ))} */}

      <Box sx={{ px: 1 }}>
        <Image alt={member.name} src={member.avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 1, mb: 0.5, mx: 2 }}>
          {member.name}
        </Typography>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

const ScrollRoot = styled(m.div)(({ theme }) => ({
  zIndex: 9,
  position: 'relative',
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
  },
}));

const ScrollContainer = styled(m.div)(({ theme }) => ({
  top: 0,
  height: '100vh',
  display: 'flex',
  position: 'sticky',
  overflow: 'hidden',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  transition: theme.transitions.create(['background-color']),
  '&[data-scrolling="true"]': { justifyContent: 'center' },
}));

const ScrollContent = styled(m.div)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(5),
  },
}));

const ScrollItem = styled(m.div)({
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'center center',
});
