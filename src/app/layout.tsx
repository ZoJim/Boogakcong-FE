import { Box } from '@mui/material';


import '../../public/fonts.css';
import Providers from './Providers';
import Navigation from "@/components/Navigation";

export const metadata = {
  title: 'Boogakcong',
  description: '부각콩 웹 페이지입니다.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta content="upgrade-insecure-requests" httpEquiv="Content-Security-Policy" />
      </head>
      <body>
        <Providers>
          <Box minHeight="100vh" width="100vw">
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
