import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const HandleLogin = (e) => {
        localStorage.setItem("secret", e.secret);
        navigate('/admin')
    }

    return (
        <form onSubmit={handleSubmit(HandleLogin)} className="bg-[#041218] min-h-screen flex justify-center items-center flex-col gap-3">
            <p className="text-4xl">Login</p>
            <div className="px-5 py-2 rounded-lg bg-[#FFFFFF1A]">
                <input type="number"  {...register('secret', { valueAsNumber: true })} className="bg-transparent outline-none text-white w-72" placeholder="Secret code" />
            </div>
            <div className="bg-gradient-to-r from-[#27C9FF] to-[#FBD130] p-[1px] rounded-lg">
                <button type="submit" className="text-white font-roboto w-full h-full bg-[#041218] px-5 py-1 rounded-lg">ENTER</button>
            </div>
        </form>
    );
};

export default Login;