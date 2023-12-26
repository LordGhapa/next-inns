/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { type ChangeEvent, useState, type FormEvent, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

export default function auth() {
  const [formData, setFormData] = useState(defaultFormData);
  const router = useRouter();
  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-nome  ";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const loginHandle = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (e) {
      console.log(e);
      toast.error("Algo Deu Errado");
    }
  };
  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signUp(formData);
      console.log(user);

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (user) {
        toast.success("Sucesso!!!");
      }

      console.log(formData);
    } catch (error) {
      console.log(error);
      toast.error("Algo Deu Errado");
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="mx-auto w-80 space-y-4 p-6 sm:p-8 md:w-[70%] md:space-y-6">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl ">
            Crie sua conta
          </h1>
          <p>OU</p>
          <span className="inline-flex items-center ">
            <AiFillGithub
              onClick={loginHandle}
              className="mr-3 cursor-pointer text-4xl text-black dark:text-white "
            />
            <FcGoogle
              onClick={loginHandle}
              className="lm-3 cursor-pointer text-4xl "
            />
          </span>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Digite seu Nome"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Digite sua Senha"
            required
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
            min={6}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-tertiary-dark px-5 py-2.5 text-center text-sm font-medium focus:outline-none "
          >
            Enviar
          </button>
        </form>
        <button onClick={loginHandle} className="text-blue-700 underline ">
          Login
        </button>
      </div>
    </section>
  );
}
