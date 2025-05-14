import { SxProps, useTheme } from '@mui/material/styles';

import { useParams } from 'react-router';
import { Box, Button, Container, Divider, Stack, Theme, Typography } from '@mui/material';
import { ComponentCard, ComponentLayout } from '../layout';
import { EmptyContent } from 'src/components/empty-content';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';
import { allComponents } from 'src/sections/nhasach/layout';
import { kebabCaseVietnamese } from 'src/utils/kebabVN';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { CartIcon } from 'src/sections/detailsbook/cart-icon';

const containerStyles: SxProps<Theme> = {
    mt: 5,
    mb: 10,
};

export function CategoryBook() {
    const { state: checkoutState } = useCheckoutContext();

    const { packageType, className } = useParams();


    if (!packageType || !className) {
        return (
            <Container sx={containerStyles}>
                <EmptyContent
                    filled
                    title="Không tìm thấy sản phẩm!"
                    action={
                        <Button
                            component={RouterLink}
                            href='/'
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

    const group = allComponents.find(
        (comp) => kebabCaseVietnamese(comp.title) === packageType
    );

    const titleSubject = group?.title || '';
    const gradeList = className.split('-'); // e.g. ["10", "11"]

    const normalizeClassList = (value: string) => {
        return value
            .split(',')
            .map((v) => v.replace('Lớp', '').trim());
    };

    const items = group?.items.filter((item) => {
        const itemGrades = normalizeClassList(item.class);
        return itemGrades.some((g) => gradeList.includes(g));
    }) || [];

    if (items.length === 0) {
        return (
            <Container sx={containerStyles}>
                <EmptyContent
                    filled
                    title="Không tìm thấy sản phẩm!"
                    action={
                        <Button
                            component={RouterLink}
                            href='/'
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

    const Category_Components = [
        {
            name: `${titleSubject} - Lớp ${className}` || '',
            component: (
                <Stack divider={<Divider sx={{ borderStyle: 'dashed', my: 8 }} />}>
                    <section key={packageType}>
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
                            {items.map((item) => (
                                <ComponentCard key={item.name} item={item} />
                            ))}
                        </Box>
                    </section>
                </Stack>
            ),
            valuesComponent: items
        }
    ];

    return (
        <>
            <CartIcon totalItems={checkoutState.totalItems} />

            <ComponentLayout
                sectionData={Category_Components}
            />
        </>
    );
}
