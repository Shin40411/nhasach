import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { varTap, varHover, transitionTap } from 'src/components/animate';

import type { NavItemData } from './nav-config-components';
import { formatCurrencyVND } from 'src/utils/format-number';
import { IconButton } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { CheckoutContextValue, ICheckoutItem } from 'src/types/checkout';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { IBookItem } from 'src/types/book';
// ----------------------------------------------------------------------

type ComponentCardProps = BoxProps<'a'> & {
  item: NavItemData;
  onAddToCart?: CheckoutContextValue['onAddToCart'];
};

export function ComponentCard({ item, onAddToCart, sx, ...other }: ComponentCardProps) {
  const product = () => ({
    id: item.idBook || '',
    title: item.name,
    subject: item.packageType || '',
    grade: item.class,
    price: item.priceBook || '',
    coverUrl: item.icon,
    author: item.author || '',
  });

  const {
    id,
    title,
    subject,
    author,
    grade,
    price,
    coverUrl
  } = product();

  const defaultValues = {
    id,
    title,
    subject,
    author,
    grade,
    price,
    quantity: 1,
    coverUrl
  };

  const methods = useForm<typeof defaultValues>({
    defaultValues,
  });

  const { watch } = methods;
  const values = watch();
  const handleAddCart = useCallback(() => {
    try {
      const newItem: ICheckoutItem = {
        ...values,
        subtotal: Number(values.price) * values.quantity,
        price: Number(values.price),
        name: values.title,
        size: values.subject,
        coverUrl: values.coverUrl || '',
        colors: [values.grade],
        available: 100
      };

      onAddToCart?.(newItem);
    } catch (error) {
      console.error(error);
    }
  }, [onAddToCart, values]);

  return (
    <>
      <Box
        component={RouterLink}
        href={item.hrefChildren}
        sx={[
          (theme) => ({
            color: 'inherit',
            borderRadius: 1.25,
            overflow: 'hidden',
            textAlign: 'center',
            position: 'relative',
            textDecoration: 'none',
            border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        {['MUI X', '3rd Party'].includes(item.packageType!) && (
          <Label
            color={item.packageType === 'MUI X' ? 'info' : 'default'}
            sx={{
              top: 8,
              right: 8,
              zIndex: 9,
              position: 'absolute',
            }}
          >
            {item.packageType}
          </Label>
        )}

        <Box
          sx={[
            (theme) => ({
              overflow: 'hidden',
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.06),
              transition: theme.transitions.create('background-color', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.sharp,
              }),
              '&:hover': {
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
              },
              ...theme.applyStyles('dark', {
                bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
              }),
            }),
          ]}
        >
          <m.div whileTap={varTap(0.98)} whileHover={varHover()} transition={transitionTap()}>
            <Box sx={{ position: 'relative' }}>
              <Image alt={item.name} src={item.icon} ratio="1/1" disablePlaceholder />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                px: 1,
                backgroundColor: '#ff6c6b',
                borderRadius: '5px 0px 0px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff'
              }}>
                {formatCurrencyVND(item.priceBook || '')}
              </Box>
            </Box>
          </m.div>
        </Box>

        <Typography variant="subtitle2" sx={{ p: 2 }}>
          {item.name}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            sx={{
              backgroundColor: 'red',
              color: '#fff',
              m: 1,
              '&:hover': {
                color: 'red',
                backgroundColor: '#fff',
              },
            }}
            title='Thêm vào giỏ hàng'
            aria-label="thêm vào giỏ hàng"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleAddCart();
            }}
          >
            <Iconify icon="solar:cart-3-bold" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
