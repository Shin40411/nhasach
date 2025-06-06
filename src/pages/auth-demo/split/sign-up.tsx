import { CONFIG } from 'src/global-config';

import { SplitSignUpView } from 'src/auth/view/auth-demo/split';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SplitSignUpView />
    </>
  );
}
