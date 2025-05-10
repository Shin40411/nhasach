import type { IAddressItem } from 'src/types/common';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export type NewAddressSchemaType = zod.infer<typeof NewAddressSchema>;

export const NewAddressSchema = zod.object({
  name: zod.string().min(1, { message: 'Họ và tên là trường bắt buộc!' }),
  address: zod.string().min(1, { message: 'Địa chỉ là trường bắt buộc!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  // Not required
  country: schemaHelper.nullableInput(zod.string()),
  city: zod.string(),
  state: zod.string(),
  zipCode: zod.string(),
  primary: zod.boolean(),
  addressType: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (address: IAddressItem) => void;
};

export function AddressNewForm({ open, onClose, onCreate }: Props) {
  const defaultValues: NewAddressSchemaType = {
    name: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    country: '',
    primary: true,
    phoneNumber: '',
    addressType: 'Nhà',
  };

  const methods = useForm<NewAddressSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const checkDefault = () => {
      const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
      return addresses.some((address: IAddressItem) => address.primary === true);
    };

    setIsDefault(checkDefault());
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newAddress = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipCode}`,
        addressType: data.addressType,
        primary: data.primary,
      };

      const existingAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');

      const updatedAddresses = [...existingAddresses, newAddress];

      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

      onCreate(newAddress);
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Thêm địa chỉ mới</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <Field.RadioGroup
              row
              name="addressType"
              options={[
                { label: 'Nhà', value: 'Nhà' },
                { label: 'Cơ quan', value: 'Cơ quan' },
              ]}
            />

            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="name" label="Họ và tên" />

              <Field.Phone name="phoneNumber" label="Số điện thoại" country="VN" />
            </Box>

            <Field.Text name="address" label="Địa chỉ" />

            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <Field.Text name="city" label="Thành phố/Thị xã" />

              <Field.Text name="state" label="Tỉnh/Quận" />

              <Field.Text name="zipCode" label="Mã bưu điện" />
            </Box>

            <Field.CountrySelect name="country" hidden label="Country" placeholder="Choose a country" />

            {!isDefault && (
              <Field.Checkbox name="primary" label="Dùng địa chỉ này làm mặc định" />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Huỷ bỏ
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            Giao tới địa chỉ này
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
