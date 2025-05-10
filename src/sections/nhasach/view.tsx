import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { varFade, MotionContainer } from 'src/components/animate';

import { ComponentCard, ComponentLayout } from './layout';
import { allComponents, NavItemData } from './layout/nav-config-components';
import { CartIcon } from '../detailsbook/cart-icon';
import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------


export function NhaSachView() {
  const { state: checkoutState, onAddToCart } = useCheckoutContext();

  return (
    <ComponentLayout
      heroProps={{
        sx: { py: 15 },
      }}
    >
      <CartIcon totalItems={checkoutState.totalItems} />

      <Stack divider={<Divider sx={{ borderStyle: 'dashed', my: 8 }} />}>
        {allComponents.map((section) => (
          <section key={section.title}>
            <Box sx={{ mb: 3, gap: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5">{section.title}</Typography>
            </Box>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2.5,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
              }}
            >
              {section.items.map((item) => (
                <ComponentCard key={item.name} item={item} onAddToCart={onAddToCart} />
              ))}
            </Box>
          </section>
        ))}
      </Stack>
    </ComponentLayout>
  );
}