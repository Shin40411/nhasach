import { CONFIG } from 'src/global-config';
import { CategoryBook } from 'src/sections/_examples/categorybook';

// ----------------------------------------------------------------------

const metadata = { title: `Danh mục - ${CONFIG.appName}` };
export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <CategoryBook />
    </>
  );
}
