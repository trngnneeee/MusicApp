"use client"

import Link from "next/link";
import JustValidate from 'just-validate';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  useEffect(() => {
    const validation = new JustValidate('#login-form');

    validation
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Email bắt buộc!'
        },
        {
          rule: 'email',
          errorMessage: 'Email sai định dạng!',
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        {
          validator: (value) => value.length >= 8,
          errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        },
        {
          validator: (value) => /[A-Z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        },
        {
          validator: (value) => /[a-z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        },
        {
          validator: (value) => /\d/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
        },
        {
          validator: (value) => /[@$!%*?&]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const rememberPassword = event.target.rememberPassword.checked ? true : false;

        const finalData = {
          email: email,
          password: password,
          rememberPassword: rememberPassword
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/account/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData),
          credentials: "include"
        })
          .then(res => res.json())
          .then((data) => {
            return data;
          })

        toast.promise(promise, {
          loading: "Đang xử lý...",
          success: (data) => {
            if (data.code == "success") {
              setTimeout(() => {
                router.push("/admin/category/list");
              }, 1000);
            }
            return data.message;
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <Toaster />
      <form className="mb-[30px]" id="login-form">
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="bg-[#F1F4F9] w-full p-[10px] md:p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-dark"
          />
        </div>
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="bg-[#F1F4F9] w-full p-[10px] md:p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-dark"
          />
        </div>
        <div className="flex justify-between mb-[15px] md:mb-[30px]">
          <div className="flex items-center gap-[8px] sm:gap-[12px]">
            <input
              type="checkbox"
              id="rememberPassword"
              className="w-[15px] md:w-[24px] h-[15px] md:h-[24px] rounded-[5px] border-[0.6px] border-[#A3A3A3]"
            />
            <label htmlFor="rememberPassword" className="font-[600] text-[12px] md:text-[18px] text-dark opacity-[0.6] translate-y-[1.25px]">Nhớ mật khẩu</label>
          </div>
          <Link href="/admin/account/forgot-password" className="font-[600] text-[12px] md:text-[18px] text-dark opacity-[0.6] hover:opacity-[1]">
            Quên mật khẩu?
          </Link>
        </div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[15px] md:text-[20px] text-white">
          Đăng nhập
        </button>
      </form>
    </>
  );
}