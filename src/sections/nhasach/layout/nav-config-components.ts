import { CONFIG } from 'src/global-config';

// import DanhSachSGK from '../../../_mock/_map/DanhSachSGK.json';
import { generateNavHref } from 'src/sections/_examples/layout/href-generated';
import { kebabCaseVietnamese } from 'src/utils/kebabVN';
import { BOOKS } from 'src/actions/book';
// ----------------------------------------------------------------------

type CreateNavItemProps = {
  name: string;
  packageType?: string;
  iconPrefix: 'ic' | 'ic-extra' | 'ic-blog' | 'sgk';
  category: 'foundation' | 'mui' | 'extra' | 'sgk';
  class: string;
  idBook?: string;
};

export type NavItemData = {
  name: string;
  icon: string;
  href: string;
  hrefChildren?: string;
  packageType?: string;
  class: string;
};

const createNavItem = ({ category, name, iconPrefix, packageType, class: className, idBook }: CreateNavItemProps) => ({
  name,
  href: generateNavHref(packageType, className),
  hrefChildren: `/${idBook}/${kebabCaseVietnamese(name)}`,
  icon: `${CONFIG.assetsDir}/assets/icons/apps/${iconPrefix}.png`,
  packageType,
  class: className,
});

const sgkGroupedNav = BOOKS.reduce((acc, book) => {
  const { subject, title, grade, id } = book;

  if (!acc[subject]) {
    acc[subject] = [];
  }

  acc[subject].push(
    createNavItem({
      category: 'sgk',
      name: title,
      iconPrefix: 'sgk',
      packageType: subject,
      class: grade,
      idBook: id
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