"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useId, useState } from "react";

const Nav = () => {
  const isUserLogin = true;
  const [providers, setProviders] = useState<any>();
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useEffect(() => {
    const initProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    initProvider();
  }, []);

  const signOut = () => null;

  const providerButton = useId();

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLogin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut}>
              Sign out
            </button>
            <Image
              src="assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={providerButton}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isUserLogin ? (
          <div className="flex">
            <Image
              src="assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile">My Profile</Link>
                <Link href="/create-prompt">Create Prompt</Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={providerButton}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
