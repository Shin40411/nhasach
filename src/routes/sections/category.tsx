import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router';

import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/bookshelf'));
const SachCategoryPage = lazy(() => import('src/pages/bookshelf/category'));
// ----------------------------------------------------------------------

export const categoriseRoutes: RouteObject[] = [
    {
        path: 'danh-muc',
        element: (
            <Suspense>
                <MainLayout>
                    <Outlet />
                </MainLayout>
            </Suspense>
        ),
        children: [
            { index: true, element: <IndexPage /> },
            {
                path: 'sach',
                children: [
                    { index: true, element: <Navigate to="/components/foundation/colors" replace /> },
                    {
                        path: ':packageType/:className',
                        element: <SachCategoryPage />,
                    },
                ],
            }
        ],
    },
];
