import { CONFIG } from 'src/global-config';

import { ComponentsView } from 'src/sections/_examples/view';

// ----------------------------------------------------------------------

const metadata = { title: `All components | MUI - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ComponentsView />
    </>
  );
}
