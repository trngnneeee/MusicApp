"use client"

import JustValidate from 'just-validate';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  
  useEffect(() => {
    const validation = new JustValidate('#forgot-password-form');

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
      .onSuccess((event) => {
        event.preventDefault();

        const email = event.target.email.value;

        const finalData = {
          email: email
        };

        const promise = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/account/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(finalData)
        })
          .then(res => res.json())
          .then(data => {
            return data;
          })

        toast.promise(promise, {
          loading: "Đang xử lý...",
          success: (data) => {
            if (data.code == "success")
            {
              setTimeout(() =>{
                router.push(`/admin/account/otp-password?email=${email}`) 
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
      <form className="mb-[30px]" id='forgot-password-form'>
        <div className="flex flex-col mb-[15px] md:mb-[30px]">
          <label className="font-[600] text-[12px] md:text-[18px] text-dark mb-[8px] md:mb-[15px]" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="bg-[#F1F4F9] w-full p-[10px] md:p-[16px] rounded-[8px] outline-none border-[1px] border-[#D8D8D8] text-[12px] md:text-[18px] font-[600] text-dark"
          />
        </div>
        <button className="w-full py-[14px] bg-[#4880FF] hover:bg-[#638df0] rounded-[8px] font-[700] text-[15px] md:text-[20px] text-white">
          Gửi mã OTP
        </button>
      </form>
    </>
  );
}