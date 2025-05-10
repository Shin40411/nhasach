import type { CheckoutContextValue } from 'src/types/checkout';

import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';

import { useRouter } from 'src/routes/hooks';

import { formatCurrencyVND, fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { Form } from 'src/components/hook-form';
import { NumberInput } from 'src/components/number-input';
import { IBookItem } from 'src/types/book';
import { useCallback } from 'react';

// ----------------------------------------------------------------------

type Props = {
  product: IBookItem;
  disableActions?: boolean;
  items?: CheckoutContextValue['state']['items'];
  onAddToCart?: CheckoutContextValue['onAddToCart'];
  coverUrl?: string;
};

export function ProductDetailsSummary({
  items,
  product,
  onAddToCart,
  disableActions,
  coverUrl,
  ...other
}: Props) {
  const router = useRouter();

  const {
    id,
    title,
    subject,
    author,
    grade,
    price
  } = product;

  const quantity = 100;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= quantity;


  const defaultValues = {
    id,
    title,
    subject,
    author,
    grade,
    price,
    quantity: quantity < 1 ? 0 : 1,
  };

  const methods = useForm<typeof defaultValues>({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;
  const values = watch();

  const descriptions = `Khám phá kho tàng tri thức và cảm hứng bất tận qua từng trang sách.
  Mỗi cuốn sách là một cánh cửa mở ra thế giới mới — từ kiến thức chuyên môn, kỹ năng sống đến những câu chuyện đầy cảm xúc. 
  Dù là hành trình tìm kiếm tri thức, thư giãn tinh thần hay mở rộng góc nhìn, sách luôn là người bạn đồng hành đáng tin cậy. 
  Một lựa chọn phù hợp sẽ mang đến trải nghiệm đáng giá cho mọi lứa tuổi và sở thích.`;

  const renderSubDescription = () => (
    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'justify' }}>
      {descriptions}
    </Typography>
  );

  const renderRating = () => (
    <Box
      sx={{
        display: 'flex',
        typography: 'body2',
        alignItems: 'center',
        color: 'text.disabled',
      }}
    >
      <Rating size="small" value={5} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(Đánh giá ${fShortenNumber(5)} sao)`}
    </Box>
  );

  const renderShare = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        justifyContent: 'center',
        [`& .${linkClasses.root}`]: {
          gap: 1,
          alignItems: 'center',
          display: 'inline-flex',
          color: 'text.secondary',
          typography: 'subtitle2',
        },
      }}
    >
      <Link>
        <Iconify icon="solar:share-bold" width={16} />
        Chia sẻ
      </Link>
    </Box>
  );

  const renderQuantity = () => (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Số lượng
      </Typography>

      <Stack spacing={1}>
        <NumberInput
          hideDivider
          value={values.quantity}
          min={1}
          onChange={(event, quantity: number) => setValue('quantity', quantity)}
          max={quantity}
          sx={{ maxWidth: 112 }}
        />

        {/* <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: 'right', color: 'text.secondary' }}
        >
          Còn lại: {quantity}
        </Typography> */}
      </Stack>
    </Box>
  );

  const handleAddCart = useCallback(() => {
    try {
      onAddToCart?.({
        ...values,
        subtotal: Number(values.price) * values.quantity,
        price: Number(values.price),
        name: values.title,
        size: values.subject,
        coverUrl: coverUrl || '',
        colors: [values.grade],
        available: quantity
      });
      console.log(values.grade);
    } catch (error) {
      console.error(error);
    }
  }, [onAddToCart, values]);

  const renderActions = () => (
    <Box sx={{ gap: 2, display: 'flex' }}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disableActions}
        size="large"
        color="warning"
        variant="contained"
        onClick={handleAddCart}
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Thêm vào giỏ
      </Button>

      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          textTransform: 'none',
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
        Liên hệ
      </Button>
    </Box>
  );

  const renderPrice = () => (
    <>
      <Box sx={{ typography: 'h5' }}>
        Tác giả: {author}
      </Box>
      <Box sx={{ typography: 'h5', color: '#ff6c6b' }}>
        Giá: {formatCurrencyVND(price)}
      </Box>
    </>
  );

  const renderContact = () => (
    <Typography variant='body2' fontWeight='bold' color='textDisabled'>Số điện thoại: 0942580848</Typography>
  );


  return (
    <Form methods={methods}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">

          <Typography variant="h5">{title}</Typography>

          {renderRating()}
          {renderPrice()}
          {renderContact()}
          {renderSubDescription()}
        </Stack>

        {renderQuantity()}

        <Divider sx={{ borderStyle: 'dashed' }} />
        {renderActions()}
        {renderShare()}
      </Stack>
    </Form>
  );
}
