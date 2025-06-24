"use client"

import JustValidate from 'just-validate';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export const ResetPasswordForm = () => {
  const router = useRouter();
  useEffect(() => {
    const validation = new JustValidate('#reset-password-form');

    validation
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
      .addField('#confirmPassword', [
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
        {
          validator: (value, fields) => {
            const password = fields['#password'].elem.value;
            return value == password;
          },
          errorMessage: 'Mật khẩu xác nhận không khớp!',
        }
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const password = event.target.password.value;

        const finalData = {
          password: password
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/account/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData),
          credentials: "include"
        })
          .then(res => res.json())
          .then(data => {
            return data;
          })

        toast.promise(promise, {
          loading: "Đang xử lý...",
          success: (data) => {
            if (data.code == "success") {
              setTimeout(() => {
                router.push(`/admin/category/list`)
              }, 1000);
            }
            return data.message
          },
          error: (data) => data.message
        })
      })
  }, [])

  return (
    <>
      <Toaster/>
      <form className="mb-[30px]" id="reset-password-form">
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="password">Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            className="bg-[#F1F4F9] w-full p-[10px] md:p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-dark"
          />
        </div>
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-[#F1F4F9] w-full p-[10px] md:p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-dark"
          />
        </div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[20px] text-white">
          Thay đổi
        </button>
      </form>
    </>
  );
}