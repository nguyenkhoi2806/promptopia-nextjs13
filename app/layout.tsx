import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = (props: LayoutProps) => {
  const { children } = props;
  const { data: session } = useSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
