import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos Framer Motion
import Header from "../../components/home/Header/Header";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Estado para el mensaje de error
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  // Validación de correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validación de contraseña (mínimo 6 caracteres)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  // Maneja el ingreso del email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  // Maneja el ingreso de la contraseña
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  // Maneja el envío del formulario de inicio de sesión
  const handleSignUp = (e) => {
    e.preventDefault();

    // Reiniciar los mensajes de error y éxito
    setErrorMsg("");
    setSuccessMsg("");

    // Validar el correo electrónico
    if (!email) {
      setErrEmail("Ingrese su correo electrónico");
      return;
    } else if (!isValidEmail(email)) {
      setErrEmail("Formato de correo electrónico inválido");
      return;
    }

    // Validar la contraseña
    if (!password) {
      setErrPassword("Ingrese su contraseña");
      return;
    } else if (!isValidPassword(password)) {
      setErrPassword("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Simular autenticación fallida si no es válida
    // En un caso real, aquí harías una petición al backend para validar el usuario
    setErrorMsg("No se puede iniciar sesión, revisa tus datos e inténtalo de nuevo");
  };

  // Función para reintentar: reinicia el error y vuelve al formulario de inicio de sesión
  const handleRetry = () => {
    setErrorMsg("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
        <Header />
    <div className="w-500 h-500 flex items-center justify-center relative">
      <div className="flex align-center">
        {successMsg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white p-10 rounded-lg shadow-lg text-center w-[400px] h-[300px] flex flex-col items-center justify-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg font-semibold mb-6">{successMsg}</p>

              {loading && (
                <motion.div
                  className="flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-16 h-16 border-8 border-t-8 border-black border-solid rounded-full animate-spin"
                    style={{ borderTopColor: "transparent" }}
                  />
                </motion.div>
              )}

              {completed && (
                <motion.div
                  className="flex justify-center items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center">
                    <motion.div
                      className="text-black text-4xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✔
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Ventana modal de error */}
        {errorMsg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white p-10 rounded-lg shadow-lg text-center w-[400px] h-[300px] flex flex-col items-center justify-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg font-semibold mb-6 text-red-500">{errorMsg}</p>

              {/* Icono de error */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center">
                  <motion.div
                    className="text-red-500 text-4xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✖
                  </motion.div>
                </div>
              </motion.div>

              {/* Botón de reintentar */}
              <button
                onClick={handleRetry}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Reintentar
              </button>
            </motion.div>
          </motion.div>
        )}

        {!successMsg && !errorMsg && (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Iniciar Sesión
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Correo Electrónico
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Contraseña
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Ingrese su Contraseña"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignUp}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                  Ingresar
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  ¿No tienes cuenta?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Regístrate aquí
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
    <Footer />
    <FooterBottom />
    </>

  );
};

export default SignIn;
