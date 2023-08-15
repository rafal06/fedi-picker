import {createContext} from "preact";
import {useMemo, useState} from "preact/hooks";

export interface PostData {
    authorNickname: string,
    authorUsername: string,
    authorPfpUrl: string,
    date: Date,
    content: string,
    mediaUrls: Array<string>,
}

const defaultValue: PostData = {
    authorNickname: '',
    authorUsername: '',
    authorPfpUrl: '',
    date: new Date(),
    content: '',
    mediaUrls: [],
}

export const PostDataContext = createContext<{
    setPostData: (value: (((prevState: PostData) => PostData) | PostData)) => void;
    postData: PostData
}>({
    postData: defaultValue,
    setPostData: () => {},
});

export default function PostDataProvider(props: any) {
    const [postData, setPostData] = useState(defaultValue);
    const postDataMemo = useMemo(() => {
        return { postData, setPostData }
    }, [postData]);

    return (
        <PostDataContext.Provider value={postDataMemo}>
            {props.children}
        </PostDataContext.Provider>
    )
}
