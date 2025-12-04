import LogoImg from "../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={LogoImg} alt="quiz_logo" />
      <h1>React Quiz app</h1>
    </header>
  );
}
