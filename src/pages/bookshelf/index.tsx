import { CONFIG } from 'src/global-config';

import { NhaSachView } from 'src/sections/nhasach/view';

// ----------------------------------------------------------------------

const metadata = { title:  `Danh mục - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <NhaSachView />
    </>
  );
}
