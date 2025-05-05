import { orderBy, kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';

import DanhSachSGK from '../../../_mock/_map/DanhSachSGK.json';
import { generateNavHref } from 'src/sections/_examples/layout/href-generated';
// ----------------------------------------------------------------------

type CreateNavItemProps = {
  name: string;
  packageType?: string;
  iconPrefix: 'ic' | 'ic-extra' | 'ic-blog' | 'sgk';
  category: 'foundation' | 'mui' | 'extra' | 'sgk';
  class: string;
};

export type NavItemData = {
  name: string;
  icon: string;
  href: string;
  packageType?: string;
  class: string;
};

const createNavItem = ({ category, name, iconPrefix, packageType, class: className }: CreateNavItemProps) => ({
  name,
  href: generateNavHref(packageType, className),
  icon: `${CONFIG.assetsDir}/assets/icons/apps/${iconPrefix}.png`,
  packageType,
  class: className,
});

// ----------------------------------------------------------------------

// const foundationNav = ['Colors', 'Typography', 'Shadows', 'Grid', 'Icons'].map((name) =>
//   createNavItem({ category: 'foundation', name, iconPrefix: 'ic', packageType: 'Foundation' })
// );

// ----------------------------------------------------------------------

const MUI_X_COMPONENTS = ['Data grid', 'Date pickers', 'Tree view'];

// const muiNav = [
//   'Chip',
//   'List',
//   'Menu',
//   'Tabs',
//   'Alert',
//   'Badge',
//   'Table',
//   'Avatar',
//   'Dialog',
//   'Rating',
//   'Slider',
//   'Switch',
//   'Drawer',
//   'Buttons',
//   'Date pickers',
//   'Popover',
//   'Stepper',
//   'Tooltip',
//   'Checkbox',
//   'Progress',
//   'Timeline',
//   'Accordion',
//   'Textfield',
//   'Data grid',
//   'Tree view',
//   'Pagination',
//   'Breadcrumbs',
//   'Autocomplete',
//   'Radio button',
//   'Transfer list',
// ].map((name) =>
//   createNavItem({
//     category: 'mui',
//     name,
//     iconPrefix: 'ic',
//     packageType: MUI_X_COMPONENTS.includes(name) ? 'MUI X' : 'MUI',
//   })
// );

// ----------------------------------------------------------------------

const THIRD_PARTY_COMPONENTS = [
  'Map',
  'Chart',
  'Image',
  'Editor',
  'Upload',
  'Scroll',
  'Animate',
  'Carousel',
  'Lightbox',
  'Snackbar',
  'Markdown',
  'Form wizard',
  'Multi language',
  'Form validation',
  'Scroll progress',
  'Organization chart',
];

// const extraNav = [
//   'Map',
//   'Dnd',
//   'Chart',
//   'Image',
//   'Label',
//   'Editor',
//   'Upload',
//   'Scroll',
//   'Layout',
//   'Animate',
//   'Carousel',
//   'Lightbox',
//   'Snackbar',
//   'Markdown',
//   'Mega menu',
//   'Utilities',
//   'Multi language',
//   'Navigation bar',
//   'Form validation',
//   'Form wizard',
//   'Scroll progress',
//   'Organization chart',
// ].map((name) =>
//   createNavItem({
//     category: 'extra',
//     name,
//     iconPrefix: 'ic-extra',
//     packageType: THIRD_PARTY_COMPONENTS.includes(name) ? '3rd Party' : 'Custom',
//   })
// );

const sgkGroupedNav = DanhSachSGK.reduce((acc, curr) => {
  const monHoc = curr['Môn học'];
  const tenSach = curr['Tên sách'];
  const lop = curr['Lớp'];
  if (!acc[monHoc]) {
    acc[monHoc] = [];
  }

  acc[monHoc].push(
    createNavItem({
      category: 'sgk',
      name: tenSach,
      iconPrefix: 'sgk',
      packageType: monHoc,
      class: lop,
    })
  );

  return acc;
}, {} as Record<string, NavItemData[]>);

const sgkComponents = Object.entries(sgkGroupedNav).map(([title, items]) => ({
  title,
  items,
}));

export const allComponents = [
  // { title: 'Foundation', items: foundationNav },
  // { title: 'MUI', items: orderBy(muiNav, ['name'], ['asc']) },
  // { title: 'Extra', items: orderBy(extraNav, ['name'], ['asc']) },
  ...sgkComponents,
];
