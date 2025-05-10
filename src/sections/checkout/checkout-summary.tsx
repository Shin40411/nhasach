import type { Theme, SxProps } from '@mui/material/styles';
import type { CheckoutContextValue } from 'src/types/checkout';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency, formatCurrencyVND } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  onEdit?: () => void;
  checkoutState: CheckoutContextValue['state'];
  onApplyDiscount?: CheckoutContextValue['onApplyDiscount'];
};

export function CheckoutSummary({ onEdit, checkoutState, onApplyDiscount }: Props) {
  const { shipping, subtotal, discount, total } = checkoutState;

  const displayShipping = shipping !== null ? 'Miễn phí' : '-';

  const rowStyles: SxProps<Theme> = {
    display: 'flex',
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Tóm tắt đơn hàng"
        action={
          onEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
              Chỉnh sửa
            </Button>
          )
        }
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ ...rowStyles }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Tạm tính
          </Typography>
          <Typography component="span" variant="subtitle2">
            {formatCurrencyVND(subtotal)}
          </Typography>
        </Box>

        {/* <Box sx={{ ...rowStyles }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Discount
          </Typography>
          <Typography component="span" variant="subtitle2">
            {discount ? fCurrency(-discount) : '-'}
          </Typography>
        </Box> */}

        <Box sx={{ ...rowStyles }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Phí giao hàng
          </Typography>
          <Typography component="span" variant="subtitle2">
            {shipping ? formatCurrencyVND(shipping) : displayShipping}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ ...rowStyles }}>
          <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
            Tổng cộng
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ display: 'block', color: 'error.main' }}
            >
              {formatCurrencyVND(total)}
            </Typography>
            {/* <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (VAT included if applicable)
            </Typography> */}
          </Box>
        </Box>

        {/* {onApplyDiscount && (
          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            value="DISCOUNT5"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button color="primary" onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        )} */}
      </Stack>
    </Card>
  );
}
