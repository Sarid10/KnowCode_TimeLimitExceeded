import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, FirebaseAuth } from "../firebase/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContract } from "../context/context";
const Login = () => {
  const { authData } = useContract();
  console.log(authData);
  const [todo, setTodo] = useState("");

  const signup = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(FirebaseAuth, googleProvider).then((data) =>
      console.log(data)
    );
  };
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className="todo-container">
      <div className="todo">
        <button onClick={signup}>Sign Up</button>
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">...</div>
      </div>
    </section>
  );
};

export default Login;
