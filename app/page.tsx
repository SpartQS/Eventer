import Image from 'next/image';
import logo from '@/public/logo.png';
import './styles/page.css';
import { AuthButton } from '@/components/authbutton';

export default function Home() {
  return (
    <div className="background">
      <div className="container">
        <div className="content">
          <div className="logo-container">
            <Image
              src={logo}
              alt="КИПУ Логотип"
              className="logo"
              width={200}
              height={100}
            />
          </div>

          <h1 className="title">КИПУ</h1>

          <p className="subtitle">
            Eventer — удобный сервис для<br />
            организации мероприятий в<br />
            университете
          </p>

          <div className="relative group flex justify-center mt-4">
            <div className="absolute w-[264px] h-[72px] bg-white/30 rounded-lg blur-[12px] opacity-0 group-hover:opacity-100 transition duration-300 translate-y-0"></div>
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
}