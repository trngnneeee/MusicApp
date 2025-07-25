import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { OTPPasswordForm } from "./OTPPasswordForm"
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kiểm tra OTP",
  description: "Nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <Suspense fallback={
        <div className="mt-[60px] mx-auto w-[300px] sm:w-[500px] text-center">
          <div>Đang tải...</div>
        </div>
      }>
        <div className="mt-[60px] mx-auto w-[300px] sm:w-[500px]">
          <Title
            title="Kiểm tra OTP"
            className="text-center"
          />
          <OTPPasswordForm />
        </div>
      </Suspense>
    </>
  );
}