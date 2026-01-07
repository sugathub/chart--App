import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import defaultAvatar from "../assets/defaultAvatar.png";
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const SearchModel = ({ startChats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term");
      return;
    }

    try {
      const normalizedSearchTerm = searchTerm.toLowerCase();

      const q = query(
        collection(db, "users"),
        where("username", ">=", normalizedSearchTerm),
        where("username", "<=", normalizedSearchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);

      const foundUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,           // ✅ IMPORTANT FOR KEY
        ...doc.data(),
      }));

      setUsers(foundUsers);

      if (foundUsers.length === 0) {
        alert("No users found");
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div>
      {/* Open Search */}
      <button
        onClick={openModal}
        className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg cursor-pointer"
      >
        <RiSearchLine color="#01AA85" className="w-[18px] h-[18px]" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-center items-center bg-[#00170cb7]"
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-[#01AA85] w-full rounded-md shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">
                  Search Chat
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-[#d9f2ed] hover:text-[#01AA85] rounded-lg w-8 h-8 flex items-center justify-center"
                >
                  <FaXmark size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex gap-2">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full p-2.5"
                    placeholder="Search username..."
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-green-900 text-white px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Results */}
                <div className="mt-6 space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id} // ✅ FIXED KEY WARNING
                      onClick={() => {
                        startChats(user);
                        closeModal();
                      }}
                      className="flex items-start gap-3 bg-[#15eabc34] p-2 rounded-lg cursor-pointer border border-[#ffffff20] shadow-lg"
                    >
                      <img
                        src={user.image || defaultAvatar}
                        className="h-[40px] w-[40px] rounded-full"
                        alt=""
                      />
                      <span>
                        <h2 className="font-semibold text-white text-[18px]">
                          {user.fullName}
                        </h2>
                        <p className="text-[13px] text-white">
                          {user.username}
                        </p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModel;
