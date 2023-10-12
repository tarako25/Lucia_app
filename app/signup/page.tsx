import Link from "next/link";
import { redirect } from "next/navigation";

import { getPageSession } from "@/auth/lucia";
import LogForm from "@/components/LogForm";

const Page = async () => {
  const session = await getPageSession();
  if (session && session.user.delete_flg == 0) redirect("/");
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-1/2 bg-gray-500 rounded">
          <h1 className="font-bold text-3xl my-6 text-gray-100">SignUp</h1>
          <LogForm action="/api/SignUp">
            <div className="flex justify-center">
              <div className="w-4/5">
                <div className=" flex flex-col items-start text-left">
                  <label
                    className="mr-3 font-bold mb-1 ml-1 text-white"
                    htmlFor="username"
                  >
                    ユーザー名
                  </label>
                  <input
                    name="username"
                    className="w-full rounded mb-3 h-10 pl-3"
                    id="username"
                  />
                  <label
                    className="mr-4 font-bold mb-1 ml-1 text-white"
                    htmlFor="password"
                  >
                    パスワード
                  </label>
                  <input
                    type="password"
                    className="w-full rounded mb-3 h-10 pl-3"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
            </div>
            <div className="mb-2 text-gray-100">
              <Link href="/login">ログインはこちら</Link>
            </div>
            <input
              type="submit"
              value="登録"
              className="bg-white rounded mb-6 px-5 py-2 font-bold text-gray-600 cursor-pointer"
            />
          </LogForm>
        </div>
      </div>
    </>
  );
};

export default Page;
