import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({username:"", email: "", password: "", address: ""});
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  }
  const submit = async (e) => {
    e.preventDefault();
   try {
    if(values.username === "" || values.email === "" || values.password === "" || values.address === "") {
      alert("Please fill all the fields");
      return;
    }
    else{
      const response = await axios.post("http://localhost:3000/api/v1/signup", values )
      console.log(response.data.message);
      navigate("/login");
    }
   } catch (error) {
     console.error("Error during signup:", error);
    
   }
  };
  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Create Account
            </span>
          </h1>
          <div className="relative w-40 h-1 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            <div className="absolute -inset-1 bg-purple-500/20 blur-sm"></div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-900/30 shadow-xl shadow-purple-900/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="MysticReader23"
                  value={values.username}
                  onChange={change}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="enchanted@library.com"
                  value={values.email}  
                  onChange={change}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="••••••••"
                value={values.password} 
                onChange={change}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Address
              </label>
              <textarea
                name="address"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="123 Magic Street, Enchanted Forest"
                rows="3"
                value={values.address}
                onChange={change}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              onClick={submit}
            >
              Sign Up
            </button>

            <p className="text-gray-400 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-medium hover:underline"
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
