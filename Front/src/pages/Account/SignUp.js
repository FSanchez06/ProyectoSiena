import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import Header from "../../components/home/Header/Header";

const SignUp = () => {
  // ============= Estado Inicial =============
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);

  // ============= Mensajes de Error ===========
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");
  const [errZip, setErrZip] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ============= Validaciones ===========
  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const handleZip = (e) => {
    setZip(e.target.value);
    setErrZip("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  // ============= Manejo de Registro ===========
  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Ingrese su nombre completo");
      }
      if (!email) {
        setErrEmail("Ingrese su correo electrónico");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Ingrese un correo electrónico válido");
        }
      }
      if (!phone) {
        setErrPhone("Ingrese su número de teléfono");
      }
      if (!password) {
        setErrPassword("Cree una contraseña");
      } else {
        if (password.length < 6) {
          setErrPassword("La contraseña debe tener al menos 6 caracteres");
        }
      }
      if (!address) {
        setErrAddress("Ingrese su dirección");
      }
      if (!city) {
        setErrCity("Ingrese el nombre de su ciudad");
      }
      if (!country) {
        setErrCountry("Ingrese su país de residencia");
      }
      if (!zip) {
        setErrZip("Ingrese el código postal de su área");
      }

      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        address &&
        city &&
        country &&
        zip
      ) {
        setSuccessMsg(
          `Hola ${clientName}, bienvenido/a al panel de administración de OREBI. Hemos recibido su solicitud de registro. Estamos procesando la validación de su acceso. Mientras tanto, manténgase conectado y recibirá asistencia adicional en su correo electrónico: ${email}.`
        );
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
        setCity("");
        setCountry("");
        setZip("");
      }
    }
  };

  return (
    <>
    <Header />
    <div className="w-full h-screen flex items-center justify-center">
      <div className="mt-40 w-full lgl:w-[500px] h-full flex flex-col">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Iniciar sesión
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Crear cuenta
              </h1>
              <div className="flex flex-col gap-3">
                {/* Nombre completo */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Nombre completo
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Correo electrónico
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="juan@correo.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                {/* Teléfono */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Teléfono
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="008801234567891"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Contraseña */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Contraseña
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Cree una contraseña"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>
                {/* Dirección */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Dirección
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Calle 123, Ciudad"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>
                {/* Ciudad */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Ciudad
                  </p>
                  <input
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Ej. Madrid"
                  />
                  {errCity && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCity}
                    </p>
                  )}
                </div>
                {/* País */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    País
                  </p>
                  <input
                    onChange={handleCountry}
                    value={country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Ej. España"
                  />
                  {errCountry && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errCountry}
                    </p>
                  )}
                </div>
                {/* Código Postal */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Código Postal
                  </p>
                  <input
                    onChange={handleZip}
                    value={zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="000000"
                  />
                  {errZip && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errZip}
                    </p>
                  )}
                </div>
                {/* Aceptar Términos y Condiciones */}
                <div className="flex flex-row gap-.5">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    onChange={(e) => setChecked(e.target.checked)}
                    value={checked}
                  />
                  <label
                    htmlFor="terms"
                    className="text-gray-600 text-base font-titleFont"
                  >
                    Acepto los términos y condiciones
                  </label>
                </div>
                <button
                  onClick={handleSignUp}
                  className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300"
                >
                  Crear cuenta
                </button>
              </div>
              <p className="text-sm font-medium text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/signin">
                  <span className="text-primeColor hover:underline underline-offset-1 cursor-pointer">
                    Inicia sesión
                  </span>
                </Link>
              </p>
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

export default SignUp;
