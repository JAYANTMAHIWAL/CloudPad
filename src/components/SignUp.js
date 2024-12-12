import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignUp = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (name === "" || email === "" || password === "" || cpassword === "") {
            swal({ icon: "error", title: "Please fill all the details" });
            return;
        }
        if (name.length < 3) {
            swal({ icon: "error", title: "Name should be atleast 3 characters long" });
            return;
        }
        if (password.length < 5) {
            swal({ icon: "error", title: "Password should be atleast 5 characters long" });
            return;
        }
        if (password !== cpassword) {
            swal({ icon: "error", title: "Password doesn't match" });
            return;
        }

        // sending data to backend
        const url = "http://localhost:5000/api/auth/createuser";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        if (json.success) {
            // save the token in local storage
            localStorage.setItem("token", json.auto_token);
            swal({ icon: "success", title: "Account Created Successfully" });
            navigate("/notes");  // redirect to notes page
        }
        else {
            swal({ icon: "error", title: json.error ? json.error : json });
        }
    }

    let navigate = useNavigate();
    return (
        <div className='container'>
            <h3 className='mb-4'>Create an account to continue with NoteOnCloud</h3>
            <form onSubmit={handleSubmit} className='container my-4'>
                <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} minLength={5} />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="cpassword" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} />
                    </div>
                </div>
                <div className='d-flex flex-row '>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <div style={{ display: "flex", margin: "auto 10px" }}>
                        <p style={{ cursor: "pointer", margin: "auto 0" }} onClick={() => navigate("/login")}>Already have an account? <span style={{ color: "blue" }}>Login</span></p>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default SignUp;
