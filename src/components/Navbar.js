import { logout } from "@/store/actions/authAction";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <>
      <navbar>
        <nav>
          <logo>
            <Link href="/" prefetch={false}>
              <div>
                <Image
                  src="/ernestoPerez.png"
                  alt="Vercel Logo"
                  width={120}
                  height={120}
                  priority
                />
                <Image
                  src="/Imagen1.svg"
                  alt="Vercel Logo"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            </Link>
          </logo>
          <div>
            <Link href="/management" prefetch={false}>
              <h3>Gestión</h3>
            </Link>
            <Link href="/records" prefetch={false}>
              <h3>Registro</h3>
            </Link>
            <h3 onClick={() => dispatch(logout())}>Logout</h3>
          </div>
        </nav>
      </navbar>
      <style jsx>
        {`
          logo {
            cursor: pointer;
          }
          navbar {
            position: fixed;
            width: 88%;
            z-index: 30;
          }
          nav {
            display: flex;
            align-items: center;
            height: 120px;
            justify-content: space-around;
            background: #d5dadb;
          }
          div {
            display: flex;
            gap: 15px;
          }
          h1 {
            margin: 0;
            line-height: 1.15;
            font-size: 3rem;
            color: #0070f3;
          }
          img {
            width: 110px;
            cursor: pointer;
          }
          contact {
            display: flex;
            padding: 1px;
            justify-content: space-evenly;
          }
          p {
            margin: 0;
            color: white;
            font-size: 14px;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
          }
          h3 {
            font-family: "Lobster";
            font-size: 1.9rem;
            font-weight: 400;
            color: #948949;
            cursor: pointer;
          }
          button {
            border: none;
            background: white;
            display: block;
            font-size: 1.17em;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
