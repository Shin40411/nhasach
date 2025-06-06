import { kebabCaseUnQuoteVn, kebabCaseVietnamese } from 'src/utils/kebabVN';
import { generateNavHref } from './href-generated';
import { CONFIG } from 'src/global-config';
import { BOOKS } from 'src/actions/book';
import { getInitials } from 'src/utils/getInitials';

export type NavItemData = {
  name: string;
  icon: string;
  href: string;
  hrefChildren?: string;
  packageType?: string;
  class: string;
  priceBook?: string;
  idBook?: string;
  author?: string;
};

type CreateNavItemProps = {
  name: string;
  packageType?: string;
  iconPrefix: string;
  category: 'foundation' | 'mui' | 'extra' | 'sgk';
  class: string;
  idBook?: string;
  priceBook?: string;
  author?: string;
};

const createNavItem = ({ category, name, iconPrefix, packageType, class: className, idBook, priceBook, author }: CreateNavItemProps) => ({
  name,
  href: generateNavHref(packageType, className),
  hrefChildren: `/${idBook}/${kebabCaseVietnamese(name)}`,
  icon: `${CONFIG.assetsDir}/assets/Thumbnail/${iconPrefix}`,
  packageType,
  class: className,
  priceBook: priceBook,
  idBook: idBook,
  author: author
});

export const getAllComponents = () => {

  const sgkGroupedNav = BOOKS.reduce((acc, book) => {
    const { subject, title, grade, id, price } = book;

    if (!acc[subject]) {
      acc[subject] = [];
    }

    let gradeComponent = '';
    let gradeExplodeComponent = '';
    if (grade.includes('Lớp ', 0)) {
      gradeComponent = grade;
      gradeExplodeComponent = grade.replace('Lớp ', '').split(', ').join('');;
    } else {
      gradeComponent = `Lớp ${grade}`;
      gradeExplodeComponent = grade.split(', ').join('');
    }

    let subjectComponent = '';
    if (subject) {
      subjectComponent = getInitials(subject);
    }

    let titleComponent = '';
    if (title) {
      titleComponent = kebabCaseUnQuoteVn(title.replace('.', ''));
    }

    const BookDir = `${gradeComponent}/thumbnail_stk${gradeExplodeComponent}_${subjectComponent}${gradeExplodeComponent}_${titleComponent}.png`;

    acc[subject].push(
      createNavItem({
        category: 'sgk',
        name: title,
        iconPrefix: BookDir,
        packageType: subject,
        class: grade,
        idBook: id,
        priceBook: price,
      })
    );

    return acc;
  }, {} as Record<string, NavItemData[]>);
  
  return Object.entries(sgkGroupedNav).map(([title, items]) => ({
    title,
    items,
  }));
};
