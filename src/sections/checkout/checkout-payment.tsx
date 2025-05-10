import type {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
  ICheckoutDeliveryOption,
} from 'src/types/checkout';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutDelivery } from './checkout-delivery';
import { CheckoutBillingInfo } from './checkout-billing-info';
import { CheckoutPaymentMethods } from './checkout-payment-methods';
// import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  { value: 0, label: 'Miễn phí', description: '5-7 ngày vận chuyển' },
  { value: 10, label: 'Nhanh', description: '3-5 ngày vận chuyển' },
  { value: 20, label: 'Cấp tốc', description: '2-3 ngày vận chuyển' },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  // {
  //   value: 'paypal',
  //   label: 'Thanh toán qua Paypal',
  //   description: 'Bạn sẽ được chuyển hướng đến trang web PayPal để hoàn tất mua hàng một cách an toàn.',
  // },
  {
    value: 'creditcard',
    label: 'Thẻ tín dụng / Thẻ ghi nợ',
    description: 'Chúng tôi hỗ trợ Mastercard, Visa, Discover và Stripe.',
  },
  { value: 'cash', label: 'Tiền mặt', description: 'Thanh toán bằng tiền mặt khi đơn hàng của bạn được giao.' },
];
// const LocalCards = JSON.parse(localStorage.getItem('cards') || '[]');
// const CARD_OPTIONS: ICheckoutCardOption[] = LocalCards.map((card: { number: string | any[]; holder: any; }, index: number) => {
//   const lastFourDigits = card.number.slice(-4);
//   const masked = `**** **** **** ${lastFourDigits}`;
//   const label = `${masked} - ${card.holder}`;
//   return {
//     value: `card${index + 1}`,
//     label,
//   };
// });
// ----------------------------------------------------------------------

export type PaymentSchemaType = zod.infer<typeof PaymentSchema>;

export const PaymentSchema = zod.object({
  payment: zod.string().min(1, { message: 'Bạn chưa chọn phương thức thanh toán!' }),
  // Not required
  delivery: zod.number(),
});

// ----------------------------------------------------------------------

export function CheckoutPayment() {
  const {
    loading,
    onResetCart,
    onChangeStep,
    onApplyShipping,
    state: checkoutState,
  } = useCheckoutContext();

  const defaultValues: PaymentSchemaType = {
    delivery: checkoutState.shipping,
    payment: '',
  };

  const methods = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      onResetCart();
      onChangeStep('next');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutDelivery
            name="delivery"
            onApplyShipping={onApplyShipping}
            options={DELIVERY_OPTIONS}
          />

          <CheckoutPaymentMethods
            name="payment"
            options={{ payments: PAYMENT_OPTIONS }}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={() => onChangeStep('back')}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Quay lại
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutBillingInfo
            loading={loading}
            onChangeStep={onChangeStep}
            checkoutState={checkoutState}
          />

          <CheckoutSummary checkoutState={checkoutState} onEdit={() => onChangeStep('go', 0)} />

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Hoàn tất đặt hàng
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
