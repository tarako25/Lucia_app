import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Link from "next/link";

import LogForm from "@/components/LogForm";

function SideBar(props: any) {
  const { userId, username } = props;

  return (
    <>
      {/* サイドバー */}
      <div className="flex items-center justify-center text-left">
        <div className="h-screen w-10/12 pb-5 font-bold">
          <div className="mt-5 border-b-2 border-white py-3 pl-3 text-white">
            <PersonIcon className="mr-2 " />
            {username}
          </div>
          <Link
            href="/"
            className="mt-5 block cursor-pointer rounded bg-white py-3 pl-3"
          >
            <HomeIcon className="mr-2" />
            ホーム
          </Link>
          {/*input属性じゃないためhtmlforが使えずLinkの場合修正 */}
          <Link
            href={`/${userId}`}
            className="mt-5 block cursor-pointer rounded bg-white py-3 pl-3"
          >
            <ManageAccountsIcon className="mr-2 " />
            プロフィール
          </Link>
          <Link
            href={`/${userId}/good`}
            className="mt-5 block cursor-pointer rounded bg-white py-3 pl-3"
          >
            <FavoriteIcon className="mr-2" />
            Goodした投稿
          </Link>
          <Link
            href={`/DirectMessageList`}
            className="mt-5 block cursor-pointer rounded bg-white py-3 pl-3"
          >
            <MailOutlineIcon className="mr-2" />
            ダイレクトメッセージ
          </Link>
          <label htmlFor="logout">
            <div className="mt-5 cursor-pointer rounded bg-white py-3 pl-3">
              <LogForm action="/api/LogOut">
                <LogoutIcon className="mr-2 " />
                <input type="submit" value="ログアウト" id="logout" />
              </LogForm>
            </div>
          </label>
          <label htmlFor="acountDelete">
            <div className="mt-5 cursor-pointer rounded bg-white py-3 pl-3">
              <LogForm action="/api/DeleteAcount">
                <PersonRemoveIcon className="mr-2 text-red-600" />
                <input
                  type="submit"
                  className="text-red-600"
                  value="アカウント削除"
                  id="acountDelete"
                />
              </LogForm>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
export default SideBar;
