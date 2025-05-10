import type { IAddressItem } from 'src/types/common';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { _addressBooks } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from './context';
import { CheckoutSummary } from './checkout-summary';
import { AddressItem, AddressNewForm } from '../address';
import { useState } from 'react';

// ----------------------------------------------------------------------

export function CheckoutBillingAddress() {
  const { onChangeStep, onCreateBillingAddress, state: checkoutState } = useCheckoutContext();

  const addressForm = useBoolean();

  const [localAddresses, setLocalAddresses] = useState(() => {
    const stored = localStorage.getItem('addresses');
    return stored ? JSON.parse(stored) : [];
  });


  const addressesToShow = localAddresses.length > 0 ? localAddresses : _addressBooks;

  const allowDelete = localAddresses.length > 0 ? true : false;

  const handleDelete = (indexToRemove: any) => {
    const updated = [...localAddresses];
    updated.splice(indexToRemove, 1);
    setLocalAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {addressesToShow.slice(0, 4).map((address: any, index: Number) => (
            <AddressItem
              key={address.id}
              address={address}
              action={
                <Box sx={{ flexShrink: 0, display: 'flex', flexWrap: 'wrap' }}>
                  {allowDelete && (
                    <Button size="small" color="error" sx={{ mr: 1 }} onClick={() => handleDelete(index)}>
                      Xóa
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      onChangeStep('next');
                      onCreateBillingAddress(address);
                    }}
                  >
                    Giao tới địa chỉ này
                  </Button>
                </Box>
              }
              sx={[
                (theme) => ({
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: theme.vars.customShadows.card,
                }),
              ]}
            />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={() => onChangeStep('back')}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Quay lại
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={addressForm.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Thêm địa chỉ mới
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutSummary checkoutState={checkoutState} />
        </Grid>
      </Grid>

      <AddressNewForm
        open={addressForm.value}
        onClose={addressForm.onFalse}
        onCreate={(address: IAddressItem) => {
          onChangeStep('next');
          onCreateBillingAddress(address);
        }}
      />
    </>
  );
}
