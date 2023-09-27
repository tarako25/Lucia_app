import Form from "@/components/form";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function side(props:any){

    const {userId, username} = props;

    return(
        <>
        <div className="flex justify-center items-center text-left">
            <div className="w-10/12 pb-5 font-bold h-screen">
                <div className="border-white border-b-2 py-3 mt-5 pl-3 text-white">
                    <PersonIcon className="mr-2 "/>{username}
                </div>
                <label htmlFor="logout">
                    <div className="bg-white mt-5 pl-3 py-3 cursor-pointer rounded">
                        <Form action="/api/logout">
                            <LogoutIcon className="mr-2 "/>
                            <input type="submit" value="ログアウト" id="logout"/>
                        </Form>
                    </div>
                </label>
                {/*input属性じゃないためhtmlforが使えずLinkの場合修正 */}
                <Link href={userId} className="bg-white mt-5 pl-3 py-3 cursor-pointer rounded block">
                    <ManageAccountsIcon className="mr-2 "/>
                    プロフィール
                </Link>
            </div>
        </div>
        </>

    )
}
export default side