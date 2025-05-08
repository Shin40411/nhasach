import type { CheckoutContextValue } from 'src/types/checkout';

import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link, { linkClasses } from '@mui/material/Link';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { ColorPicker } from 'src/components/color-utils';
import { NumberInput } from 'src/components/number-input';
import { IBookItem } from 'src/types/book';

// ----------------------------------------------------------------------

type Props = {
  product: IBookItem;
  disableActions?: boolean;
  items?: CheckoutContextValue['state']['items'];
  onAddToCart?: CheckoutContextValue['onAddToCart'];
};

export function ProductDetailsSummary({
  items,
  product,
  onAddToCart,
  disableActions,
  ...other
}: Props) {
  const router = useRouter();

  const {
    id,
    title,
    subject,
    author,
    grade,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const defaultValues = {
    id,
    title,
    subject,
    author,
    grade,
  };

  const methods = useForm<typeof defaultValues>({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const descriptions = `Khám phá kho tàng tri thức và cảm hứng bất tận qua từng trang sách.
Mỗi cuốn sách là một cánh cửa mở ra thế giới mới — từ kiến thức chuyên môn, kỹ năng sống đến những câu chuyện đầy cảm xúc. Dù là hành trình tìm kiếm tri thức, thư giãn tinh thần hay mở rộng góc nhìn, sách luôn là người bạn đồng hành đáng tin cậy. Một lựa chọn phù hợp sẽ mang đến trải nghiệm đáng giá cho mọi lứa tuổi và sở thích.`;

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

  // const renderLabels = () =>
  //   (newLabel.enabled || saleLabel.enabled) && (
  //     <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
  //       {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
  //       {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
  //     </Box>
  //   );

  // const renderInventoryType = () => (
  //   <Box
  //     component="span"
  //     sx={{
  //       typography: 'overline',
  //       color:
  //         (inventoryType === 'out of stock' && 'error.main') ||
  //         (inventoryType === 'low stock' && 'warning.main') ||
  //         'success.main',
  //     }}
  //   >
  //     {inventoryType}
  //   </Box>
  // );

  const renderPrice = () => (
    <Box sx={{ typography: 'h5' }}>
      Tác giả: {author}
    </Box>
  );

  return (
    <Form methods={methods}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">

          <Typography variant="h5">{title}</Typography>

          {renderRating()}
          {renderPrice()}
          {renderSubDescription()}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>
    </Form>
  );
}
