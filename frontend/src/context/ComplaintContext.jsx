import { createContext, useContext, useState } from "react";

const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);

  const addComplaint = (complaint) => {
    setComplaints([...complaints, complaint]);
  };

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintContext);
