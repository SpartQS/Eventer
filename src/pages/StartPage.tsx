import { Button } from "@/components/ui/button";
import logo from '../assets/logo.png';
import '../styles/StartPage.css';
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";


export function StartPage() {
    const { keycloak, initialized } = useKeycloak();
    console.log("Keycloak initialized:", initialized);
    return (
        <div className="background">
            <div className="container">
                <div className="content">
                    <div className="logo-container">
                        <img src={logo} alt="КИПУ Логотип" className="logo" />
                    </div>

                    <h1 className="title">КИПУ</h1>

                    <p className="subtitle">
                        Eventer — удобный сервис для<br />
                        организации мероприятий в<br />
                        университете
                    </p>

                    <div className="relative group flex justify-center mt-4">
                        <div className="absolute w-[264px] h-[72px] bg-white/30 rounded-lg blur-[12px] opacity-0 group-hover:opacity-100 transition duration-300 translate-y-0"></div>
                        {initialized && (
                            <Button
                                size="lg"
                                className="relative bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground border border-white/30 w-64 h-16 text-2xl font-bold transition-all duration-300 hover:scale-105"
                                onClick={() => keycloak.login({
                                    redirectUri: window.location.origin + '/profile'
                                })}
                            >
                                Авторизация
                            </Button>
                        )}
                    </div>

                    <div className="text-center">
                        <Link
                            to="/register"
                            className="text-white/80 hover:text-white text-lg transition-colors duration-200 underline hover:no-underline"
                        >
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

