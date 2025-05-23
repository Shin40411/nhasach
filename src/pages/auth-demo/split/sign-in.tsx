import { CONFIG } from 'src/global-config';

import { SplitSignInView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SplitSignInView />
    </>
  );
}
