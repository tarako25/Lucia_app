import Form from "@/components/form";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function side(props:any){

    const {userId, username} = props;

    return(
        <>
        <div className="flex justify-center items-center text-left">
            <div className="w-10/12 pb-5 font-bold h-screen">
                <div className="border-white border-b-2 py-3 mt-5 pl-3 text-white">
                    <PersonIcon className="mr-2 "/>{username}
                </div>
                <div className="bg-white mt-5 pl-3 py-3 cursor-pointer rounded">
                    <label htmlFor="logout">
                        <Form action="/api/logout">
                            <LogoutIcon className="mr-2 "/>
                            <input type="submit" value="ログアウト" id="logout"/>
                        </Form>
                    </label>
                </div>
            </div>
        </div>
        </>

    )
}
export default side