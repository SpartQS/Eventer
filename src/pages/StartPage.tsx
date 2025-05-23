import { Button } from "@/components/ui/button";
import logo from '../assets/logo.png';
import '../styles/StartPage.css';


export function StartPage() {
    return (
        <div className="background">
            <div className="container">
                <div className="content">
                    <div className="logo-container">
                        <img src={logo} alt="КИПУ Логотип" className="logo" />
                    </div>

                    <h1 className="title">КИПУ</h1>

                    <p className="subtitle">
                        UniEvents — удобный сервис для<br />
                        организации мероприятий в<br />
                        университете
                    </p>

                    <Button
                        size="lg"
                        className="mt-4 bg-white text-black hover:bg-gray-300 border border-white shadow-[0_0_35px_rgba(255,255,255,0.7)] w-64 h-16 text-2xl font-bold"
                    >
                        Авторизация
                    </Button>
                </div>
            </div>
        </div>
    );
};

