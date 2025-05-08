import type { Theme, SxProps } from '@mui/material/styles';

import { useTabs } from 'minimal-shared/hooks';
import { varAlpha } from 'minimal-shared/utils';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useCheckoutContext } from '../../checkout/context';
import { ProductDetailsSkeleton } from '../product-skeleton';
import { ProductDetailsReview } from '../product-details-review';
import { ProductDetailsSummary } from '../product-details-summary';
import { ProductDetailsCarousel } from '../product-details-carousel';
import { ProductDetailsDescription } from '../product-details-description';
import { IBookItem } from 'src/types/book';
import { CONFIG } from 'src/global-config';
import { kebabCaseUnQuoteVn } from 'src/utils/kebabVN';
import { getInitials } from 'src/utils/getInitials';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 days replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
] as const;

// ----------------------------------------------------------------------

type Props = {
  product?: IBookItem;
  loading?: boolean;
  error?: any;
};

export function ProductShopDetailsView({ product, error, loading }: Props) {
  // const { state: checkoutState, onAddToCart } = useCheckoutContext();

  const containerStyles: SxProps<Theme> = {
    mt: 5,
    mb: 10,
  };

  const descriptions = `
  Tác giả: ${product?.author} <br />
  Thuộc: ${product?.grade} <br />
  Bộ môn: ${product?.subject}`;

  let gradeComponent = '';
  let gradeExplodeComponent = '';
  if (product?.grade.includes('Lớp ', 0)) {
    gradeComponent = product?.grade;
    gradeExplodeComponent = product?.grade.replace('Lớp ', '').split(', ').join('');;
  } else {
    gradeComponent = `Lớp ${product?.grade}`;
    gradeExplodeComponent = (product?.grade || '').split(', ').join('');
  }

  let subjectComponent = '';
  if (product?.subject) {
    subjectComponent = getInitials(product?.subject);
  }

  let titleComponent = '';
  if (product?.subject) {
    titleComponent = kebabCaseUnQuoteVn(product.title.replace('.', ''));
  }

  const bookDirConfig = `${gradeComponent}/thumbnail_stk${gradeExplodeComponent}_${subjectComponent}${gradeExplodeComponent}_${titleComponent}.png`;

  const thumbnailBook: string[] = [
    `${CONFIG.assetsDir}/assets/Thumbnail/${bookDirConfig}`
  ];
  const tabs = useTabs('description');

  if (loading) {
    return (
      <Container sx={containerStyles}>
        <ProductDetailsSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={containerStyles}>
        <EmptyContent
          filled
          title="Không tìm thấy sản phẩm!"
          action={
            <Button
              component={RouterLink}
              href={paths.product.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Về trang chủ
            </Button>
          }
          sx={{ py: 10 }}
        />
      </Container>
    );
  }

  return (
    <Container sx={containerStyles}>
      <CustomBreadcrumbs
        links={[
          { name: 'Trang chủ', href: '/' },
          { name: product?.title },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <ProductDetailsCarousel images={thumbnailBook} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {product && (
            <ProductDetailsSummary
              product={product}
            // items={checkoutState.items}
            />
          )}
          <Box sx={{ my: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              }}
              onClick={() => window.location.href = 'tel:0942580848'}
              startIcon={<Iconify icon="solar:phone-bold" />}
            >
              Liên hệ ngay
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          gap: 5,
          my: 10,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
      </Box>

      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={[
            (theme) => ({
              px: 3,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }),
          ]}
        >
          {[
            { value: 'description', label: 'Mô tả' },
            // { value: 'reviews', label: `Reviews (${product?.reviews.length})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <ProductDetailsDescription description={descriptions} />
        )}

        {/* {tabs.value === 'reviews' && (
          <ProductDetailsReview
            ratings={product?.ratings}
            reviews={product?.reviews}
            totalRatings={product?.totalRatings}
            totalReviews={product?.totalReviews}
          />
        )} */}
      </Card>
    </Container>
  );
}
