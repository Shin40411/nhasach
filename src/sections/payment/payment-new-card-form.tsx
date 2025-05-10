import type { BoxProps } from '@mui/material/Box';
import type { TextFieldProps } from '@mui/material/TextField';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type PaymentNewCardFormProps = BoxProps & {
  isRHF?: boolean;
  numberField?: TextFieldProps & { name: string };
  holderField?: TextFieldProps & { name: string };
  dateField?: TextFieldProps & { name: string };
  cvvField?: TextFieldProps & { name: string };
};

export function PaymentNewCardForm({
  sx,
  isRHF,
  cvvField,
  dateField,
  numberField,
  holderField,
  ...other
}: PaymentNewCardFormProps) {
  const FormField = isRHF ? Field.Text : TextField;

  const showPassword = useBoolean();

  return (
    <Box
      sx={[
        () => ({
          gap: 2.5,
          width: 1,
          display: 'flex',
          flexDirection: 'column',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Controller
        name={numberField?.name ?? ''}
        control={useFormContext().control}
        rules={{
          required: 'Vui lòng nhập số thẻ',
          validate: (value) =>
            value.replace(/\s/g, '').length === 16 || 'Số thẻ phải có 16 chữ số',
        }}
        render={({ field, fieldState }) => (
          <FormField
            {...numberField}
            {...field}
            label="Số thẻ"
            placeholder="xxxx xxxx xxxx xxxx"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 16);
              const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
              field.onChange(formatted);
            }}
          />
        )}
      />
      <Controller
        name={holderField?.name ?? ''}
        control={useFormContext().control}
        rules={{
          required: 'Vui lòng nhập tên chủ thẻ',
          validate: (value) =>
            /^[A-Z\s']{2,}$/.test(value.trim()) || 'Tên không hợp lệ (chỉ A-Z, không dấu, ít nhất 2 ký tự)',
        }}
        render={({ field, fieldState }) => (
          <FormField
            {...holderField}
            {...field}
            label="Chủ thẻ"
            placeholder="NGUYEN VAN A"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={(e) => {
              const inputValue = e.target.value;
              const noDiacritics = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              const uppercased = noDiacritics.toUpperCase();
              field.onChange(uppercased);
            }}
          />
        )}
      />
      <Box sx={{ gap: 2, display: 'flex' }}>
        <Controller
          name={dateField?.name ?? ''}
          control={useFormContext().control}
          rules={{
            required: 'Vui lòng nhập ngày hết hạn',
            validate: (value) => {
              const [mm, yy] = value.split('/');
              if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return 'Định dạng không hợp lệ (MM/YY)';
              const month = parseInt(mm, 10);
              if (month < 1 || month > 12) return 'Tháng không hợp lệ';

              const now = new Date();
              const inputDate = new Date(2000 + parseInt(yy, 10), month - 1);
              return inputDate >= new Date(now.getFullYear(), now.getMonth()) || 'Thẻ đã hết hạn';
            },
          }}
          render={({ field, fieldState }) => (
            <FormField
              {...dateField}
              {...field}
              label="Ngày hết hạn"
              placeholder="MM/YY"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
                field.onChange(value);
              }}
            />
          )}
        />
        <Controller
          name={cvvField?.name ?? ''}
          control={useFormContext().control}
          rules={{
            required: 'Vui lòng nhập CVV',
            pattern: {
              value: /^\d{3,4}$/,
              message: 'CVV phải gồm 3 hoặc 4 chữ số',
            },
          }}
          render={({ field, fieldState }) => (
            <FormField
              {...cvvField}
              {...field}
              label="CVV/CVC"
              placeholder="***"
              type={showPassword.value ? 'text' : 'password'}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                field.onChange(value);
              }}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <Iconify
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          gap: 1,
          display: 'flex',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Iconify icon="solar:lock-password-outline" />
        Giao dịch của bạn được bảo mật bằng mã hóa SSL
      </Box>
    </Box>
  );
}
