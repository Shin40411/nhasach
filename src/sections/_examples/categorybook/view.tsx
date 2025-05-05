import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ComponentLayout } from '../../nhasach/layout/component-layout';
import { useParams } from 'react-router';
import { Typography } from '@mui/material';
import { startCase } from 'es-toolkit';

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

// ----------------------------------------------------------------------

export function CategoryBook() {
    const theme = useTheme();
    const { packageType, className } = useParams();
    const [column, setColumn] = useState<number>(3);
    const [spacing, setSpacing] = useState<number>(2);

    const handleChangeSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number(event.target.value));
    };

    const handleChangeColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumn(Number(event.target.value));
    };

    const DEMO_COMPONENTS = [
        {
            name: `${startCase(packageType || '')} - Lớp ${className}` || '',
            component: (
                    <Grid container spacing={spacing} sx={{ width: 1 }}>
                        <Typography variant="h5" sx={{ mb: 2 }} content={packageType} />
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                            <Grid key={value} size={{ xs: 1 }}>
                                <Paper sx={{ height: 80, boxShadow: theme.vars.customShadows.z8 }} />
                            </Grid>
                        ))}
                    </Grid>
            ),
        }
    ];

    return (
        <ComponentLayout
            sectionData={DEMO_COMPONENTS}
            heroProps={{
                heading: 'Grid',
            }}
        />
    );
}
