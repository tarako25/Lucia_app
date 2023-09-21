import Form from "@/components/form";

function side(props:any){

    const {userId, username} = props;

    return(
        <>
        <div className="flex justify-center items-center text-left">
            <div className="w-10/12 pb-5 font-bold">
                <div className="border-white border-b-2 py-3 mt-5 pl-3">
                    {username}
                </div>
                <div className="bg-white mt-5 pl-3 py-3 cursor-pointer">
                    <label htmlFor="logout">
                        <Form action="/api/logout">
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