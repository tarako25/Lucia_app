export  interface Item {
            id: number;
            content: string;
            comment_count: number;
            username: string;
            createdAt: Date;
        }

export  interface PostListProps {
            userId: string;
            username: string;
        }
    
export  interface SubmitPostData {
            userId: string;
            username: string;
            message:FormDataEntryValue | null
        }