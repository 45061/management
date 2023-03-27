import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Cookies from "universal-cookie";

import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "@/store/actions/modalActions";

import PublicModal from "@/components/PublicModal";
import Login from "@/components/Login";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const cookies = new Cookies();
  const token = cookies.get("myTokenName");
  const [state, setState] = useState("Login");

  const dispatch = useDispatch();

  const largeScreen = useMediaQuery("(min-width: 1024px)");

  const { showingLogin } = useSelector((state) => state.modalReducer);

  const handleClick = () => {
    cookies.remove("myTokenName");
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description__initial}>
          <div>
            <Image
              src="/ernestoPerez.png"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={200}
              height={200}
              priority
            />
            <Image
              src="/Imagen1.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={200}
              height={200}
              priority
            />
          </div>
          {!token ? (
            <p onClick={() => dispatch(showLogin())}>Login</p>
          ) : (
            <p onClick={handleClick}>Logout</p>
          )}
        </div>
        <div className={styles.description__app}>
          <p>
            <span>¡Bienvenidos a nuestra página web!</span> Aquí encontrarás
            toda la información que necesitas sobre la gestión de reservas de
            <span> Oporto 83</span>. Nuestra web se enfoca en brindar soluciones
            innovadoras para nuestros clientes y en mantenernos a la vanguardia
            del mercado. Navega por nuestras secciones y descubre todo lo que
            tenemos para ofrecerte.{" "}
            <span>
              ¡No dudes en contactarnos si tienes alguna pregunta o necesitas
              ayuda en cualquier momento!
            </span>
          </p>
          <Image
            src="/ernesto2.png"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={400}
            height={400}
            priority
          />
        </div>
        <div className={styles.label}>
          <h2>
            Esta <span>aplicacion</span> es <span>patrocinada</span> por{" "}
            <span>Ernesto</span> Perez <span>y</span> potenciada{" "}
            <span>por</span> NextJS
          </h2>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}></div>
      </main>
      <PublicModal
        opened={showingLogin}
        onClose={() => dispatch(showLogin())}
        size={largeScreen ? "35%" : "90%"}
      >
        <Login />
      </PublicModal>
    </>
  );
}
