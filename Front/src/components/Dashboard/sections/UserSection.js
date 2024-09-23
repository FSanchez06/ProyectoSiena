import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api'; // Asegúrate de que esta función esté definida en api.js
import { motion } from 'framer-motion';
import Modal from 'react-modal'; // Asegúrate de instalar react-modal
import { FaEdit, FaTrash } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await fetch(`http://localhost:3002/users/${userToDelete}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userToDelete));
      setModalMessage('Usuario eliminado con éxito');
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error deleting user:", error);
      setModalMessage('Error al eliminar el usuario');
      setIsModalOpen(true);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditUser = (user) => {
    // Aquí puedes abrir un modal para editar el usuario
    // Implementa la lógica de edición según tus necesidades
    console.log("Edit user:", user);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sección de Usuarios</h1>
      
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-w-full border-collapse border border-gray-200"
      >
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Teléfono</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">
                <button onClick={() => handleEditUser(user)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => { setUserToDelete(user.id); setIsDeleteModalOpen(true); }} className="text-red-500 ml-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      {/* Modal for messages */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Mensaje"
        ariaHideApp={false}
      >
        <h2>{modalMessage}</h2>
        <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Confirmar Eliminación"
        ariaHideApp={false}
      >
        <h2>¿Estás seguro de que deseas eliminar este usuario?</h2>
        <button onClick={handleDeleteUser}>Eliminar</button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default UserSection;
