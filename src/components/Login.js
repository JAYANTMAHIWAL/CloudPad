import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.email === "" || credentials.password === "") {
            swal({ icon: "error", title: "Please fill all the details" });
            return;
        }

        const url = "http://localhost:5000/api/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();

        if (json.success) {
            // save the token in local storage
            localStorage.setItem("token", json.auto_token);
            swal({ icon: "success", title: "Login Successfully" });

            navigate("/notes");  // redirect to notes page
        }
        else {
            swal({ icon: "error", title: json.error ? json.error : json });
        }
    }

    let navigate = useNavigate();
    return (
        <div className='container'>
            <h3 className='mb-4'>Login to continue with CloudPad</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
                </div>
                <div className='d-flex flex-row '>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div style={{ display: "flex", margin: "auto 10px" }}>
                        <p style={{ cursor: "pointer", margin: "auto 0" }} onClick={() => navigate("/signup")}> Create an account? <span style={{ color: "blue" }}>Sign up</span></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
