import dynamic from 'next/dynamic';

const Feed = dynamic(() => import('@components/Feed'));

const Home = async () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & shared
        <br className="mx-md:hidden" />
        <span className="orange_gradient">AI - Powered Prompts</span>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>
      </h1>
      <Feed />
    </section>
  );
};

export default Home;
