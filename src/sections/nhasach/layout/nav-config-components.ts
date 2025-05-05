import { CONFIG } from 'src/global-config';

import DanhSachSGK from '../../../_mock/_map/DanhSachSGK.json';
import { generateNavHref } from 'src/sections/_examples/layout/href-generated';
import { kebabCaseVietnamese } from 'src/utils/kebabVN';
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
  hrefChildren?: string;
  packageType?: string;
  class: string;
};

const createNavItem = ({ category, name, iconPrefix, packageType, class: className }: CreateNavItemProps) => ({
  name,
  href: generateNavHref(packageType, className),
  hrefChildren: `/${kebabCaseVietnamese(name)}`,
  icon: `${CONFIG.assetsDir}/assets/icons/apps/${iconPrefix}.png`,
  packageType,
  class: className,
});

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
  ...sgkComponents,
];
