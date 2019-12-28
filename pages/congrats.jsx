const Congrats = () => (
  <div>
    <img src="/schriftzug.png" className="logo" />
    Congrats! You're in! <br /> xoxo, Schlawiner
    <p>
      <a href="https://www.instagram.com/schlawiner_official/">
        <img src="/insta.png" className="social" />
      </a>
    </p>
    <style jsx>{`
      img.logo {
        margin-bottom: 60px;
      }
      img.social {
        width: 40px;
      }
      div {
        max-width: 400px;
        margin: 20px;
        font-family: Helvetica, sans-serif;
        font-weight: bold;
        text-align: center;
        color: #c4c2c2;
        line-height: 1.5;
      }
      p {
        margin-top: 60px;
      }
    `}</style>
  </div>
);

export default Congrats;
