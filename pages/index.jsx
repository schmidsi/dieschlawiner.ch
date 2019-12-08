import Head from 'next/head';

const Home = () => {
  return (
    <div className="root">
      <Head>
        <title>Schlawiner</title>
      </Head>
      <style jsx global>{`
        html,
        body {
          width: 100%;
          min-height: 100%;
          background-color: #fe0000;
          background-image: url('/bg.jpg');
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 50%;
        }
      `}</style>
      <style jsx>{`
        .root {
        }
      `}</style>
    </div>
  );
};

export default Home;
