import { kebabCase } from "es-toolkit";
import { kebabCaseVietnamese } from "src/utils/kebabVN";

export const generateNavHref = (packageType?: string, className?: string) => {
  const pkg = kebabCaseVietnamese(packageType || '');
  const cls = kebabCase(className || '').replace('lop-', '').replace('lớp-', '');
  return `/danh-muc/sach/${pkg}/${cls}`;
};
