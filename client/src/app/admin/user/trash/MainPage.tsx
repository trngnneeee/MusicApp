"use client"

import { MultipleApplyTrash } from "@/app/components/Admin/MultipleApply/MultipleApplyTrash";
import { Active } from "@/app/components/Admin/StatusBar/Active";
import { Inactive } from "@/app/components/Admin/StatusBar/Inactive";
import { Search } from "@/app/components/Admin/Search/Search";
import { Title } from "@/app/components/Admin/Title/Title";
import { useAuth } from "@/hooks/useAuth";

export const MainPage = () => {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <Title title={"Thùng rác"} />
          <div className="flex gap-[20px] mt-[15px] flex-wrap">
            <MultipleApplyTrash />
            <Search />
          </div>
          <div className="border-[0.6px] border-[#D5D5D5] rounded-[14px] mt-[30px] overflow-x-auto w-full">
            <table className="bg-white w-full min-w-[1000px]">
              <thead className="">
                <tr className="bg-[#FCFDFD]">
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Tên người dùng</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Email</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Ảnh đại diện</th>
                  <th className="px-[15px] xl:px-[32px] py-[15px] text-left align-middle">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Lê Văn A</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">levana@gmail.com</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <Active />
                  </th>
                </tr>
                <tr className="bg-white border-t-[#D5D5D5] border-t-[0.6px]">
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <input type="checkbox" className="translate-y-[2px]" />
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">Lê Văn B</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle font-[600] text-[14px] text-dark">levanb@gmail.com</th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <div className="w-[60px] h-[60px] overflow-hidden">
                      <img src="/demoAvatar.png" className="w-full h-full object-cover" />
                    </div>
                  </th>
                  <th className="px-[15px] xl:px-[32px] py-[8px] text-left align-middle">
                    <Inactive />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-[20px] flex gap-[20px] items-center">
            <div className="text-[14px] font-[600] text-dark opacity-[0.6]">Hiển thị 1 - 9 của 78</div>
            <div className="border-[0.6px] border-[#D5D5D5] rounded-[8px]">
              <select className="px-[14px] py-[6px] rounded-[8px] outline-none text-[14px] font-[600] text-dark opacity-[0.6]">
                <option>Trang 1</option>
                <option>Trang 2</option>
                <option>Trang 3</option>
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
}