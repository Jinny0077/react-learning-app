import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <h2 style={{ fontSize: "40px" }}>Welcome To </h2>
      <h3 style={{ fontSize: "65px" }}>My React Learning Web App</h3>
      <p style={{ fontSize: "24px" }}>
        This app showcases my frontend development skills using React.
        <br />
        <span style={{ fontSize: "22px" }}>
          It incorporates various libraries such as:
        </span>
      </p>
      <ul className="library">
        <li>React Router</li>
        <li>React Hook</li>
        <li>React Hook Form</li>
        <li>React Redux</li>
        <li>Axios</li>
        <li>Yup</li>
      </ul>
    </div>
  );
};

export default Home;
