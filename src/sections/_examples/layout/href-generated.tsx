import { kebabCase } from "es-toolkit";

export const generateNavHref = (packageType?: string, className?: string) => {
    const pkg = kebabCase(packageType || '');
    const cls = kebabCase(className || '').replace('lop-', '').replace('lớp-', '');
    return `danh-muc/sach/${pkg}/${cls}`;
  };
  