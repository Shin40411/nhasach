import { kebabCaseVietnamese } from 'src/utils/kebabVN';
import DanhSachSGK from '../../../_mock/_map/DanhSachSGK.json';
import { generateNavHref } from './href-generated';
import { CONFIG } from 'src/global-config';
import { BOOKS } from 'src/actions/book';

export type NavItemData = {
  name: string;
  icon: string;
  href: string;
  hrefChildren?: string;
  packageType?: string;
  class: string;
};

type CreateNavItemProps = {
  name: string;
  packageType?: string;
  iconPrefix: 'ic' | 'ic-extra' | 'ic-blog' | 'sgk';
  category: 'foundation' | 'mui' | 'extra' | 'sgk';
  class: string;
  idBook?: string;
};

const createNavItem = ({ category, name, iconPrefix, packageType, class: className, idBook }: CreateNavItemProps): NavItemData => ({
  name,
  href: generateNavHref(packageType, className),
  hrefChildren: `/${idBook}/${kebabCaseVietnamese(name)}`,
  icon: `${CONFIG.assetsDir}/assets/icons/apps/${iconPrefix}.png`,
  packageType,
  class: className,
});

export const getAllComponents = () => {

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
  // const sgkGroupedNav = DanhSachSGK.reduce((acc, curr) => {
  //   const monHoc = curr['Môn học'];
  //   const tenSach = curr['Tên sách'];
  //   const lop = curr['Lớp'];
  //   if (!acc[monHoc]) {
  //     acc[monHoc] = [];
  //   }

  //   acc[monHoc].push(
  //     createNavItem({
  //       category: 'sgk',
  //       name: tenSach,
  //       iconPrefix: 'sgk',
  //       packageType: monHoc,
  //       class: lop,
  //     })
  //   );

  //   return acc;
  // }, {} as Record<string, NavItemData[]>);

  return Object.entries(sgkGroupedNav).map(([title, items]) => ({
    title,
    items,
  }));
};
