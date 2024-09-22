import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    photo: ""
  });
  
  useEffect(() => {
    if (userInfo && userInfo.length > 0) {
      const user = userInfo[0];
      setUserData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        zip: user.zip,
        photo: user.photo
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para actualizar los datos del usuario en el servidor
    console.log("Datos actualizados:", userData);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Perfil" prevLocation="Home" />
      <div className="container mx-auto p-4 flex flex-col items-center">
        
        {userData ? (
          <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleSubmit}>
            <h1 className="font-titleFont font-semibold text-3xl mb-8 text-center">Perfil</h1>
            <div className="flex flex-col items-center mb-6">
              <img
                src={userData.photo || "https://via.placeholder.com/150"}
                alt="Perfil del usuario"
                className="rounded-full w-32 h-32 mb-4"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-base font-titleFont font-semibold">Nombre</p>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  placeholder="Ingrese su Nombre"
                />
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold">Email</p>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  readOnly
                  placeholder="Ingrese su Email"
                />
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold">Teléfono</p>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  placeholder="Ingrese su Teléfono"
                />
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold">Dirección</p>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  placeholder="Ingrese su Dirección"
                />
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold">Ciudad</p>
                <input
                  type="text"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  placeholder="Ingrese su Ciudad"
                />
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold">Código Postal</p>
                <input
                  type="text"
                  name="zip"
                  value={userData.zip}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm text-base font-medium placeholder:text-gray-400 focus:outline-none focus:border-primeColor focus:ring-1 focus:ring-primeColor"
                  placeholder="Ingrese su Código Postal"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="w-48 bg-primeColor text-white h-10 font-semibold rounded-lg shadow-md hover:bg-black hover:text-white transition duration-200"
              >
                Actualizar Datos
              </button>
            </div>
          </form>
        ) : (
          <p>No se ha podido cargar la información del usuario.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
