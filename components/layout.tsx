function layout(props:any){

    const {userId, username} = props;

    return(
        <>
        <div>Message_App</div>
        <p>【ユーザー名】</p>
        <p>{username}</p>
        <p>【ユーザーID】</p>
        <p>{userId}</p>
        </>

    )
}
export default layout