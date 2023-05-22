import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/create-prompt'],
};

export default withAuth(
  function middleware(request: any) {
    if (!request.nextauth) {
      return new NextResponse('You are not authorize');
    }
  },
  {
    callbacks: {
      authorized: (params: any) => {
        const { token } = params;
        return token;
      },
    },
  }
);
