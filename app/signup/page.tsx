import Link from "next/link";
import { redirect } from "next/navigation";

import { getPageSession } from "@/auth/lucia";
import LogForm from "@/components/LogForm";

const Page = async () => {
  const session = await getPageSession();
  if (session && session.user.delete_flg == 0) redirect("/");
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-1/2 rounded bg-gray-500">
          <h1 className="my-6 text-3xl font-bold text-gray-100">SignUp</h1>
          <LogForm action="/api/SignUp">
            <div className="flex justify-center">
              <div className="w-4/5">
                <div className=" flex flex-col items-start text-left">
                  <label
                    className="mb-1 ml-1 mr-3 font-bold text-white"
                    htmlFor="username"
                  >
                    ユーザー名
                  </label>
                  <input
                    name="username"
                    className="mb-3 h-10 w-full rounded pl-3"
                    id="username"
                  />
                  <label
                    className="mb-1 ml-1 mr-4 font-bold text-white"
                    htmlFor="password"
                  >
                    パスワード
                  </label>
                  <input
                    type="password"
                    className="mb-3 h-10 w-full rounded pl-3"
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
              className="mb-6 cursor-pointer rounded bg-white px-5 py-2 font-bold text-gray-600"
            />
          </LogForm>
        </div>
      </div>
    </>
  );
};

export default Page;
