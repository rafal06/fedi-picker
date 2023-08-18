import {Spinner} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "preact/hooks";
import {PostData, PostDataContext} from "./PostDataContext.tsx";
import {SettingsContext} from "./SettingsContext.tsx";

export default function PostPreview() {
    const { settings } = useContext(SettingsContext);
    const { postData, setPostData } = useContext(PostDataContext);
    const [state, setState] = useState<{
        loading: boolean,
        error: null | Error,
    }>({
        loading: true,
        error: null,
    });
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            setState({
                loading: false,
                error: null,
            });
            return;
        }

        setState({
            loading: true,
            error: null,
        });
        getPostData(new URL(settings.postUrl))
            .then(data => {
                setPostData(data);
                setState({
                    loading: false,
                    error: null,
                })
            })
            .catch((err: Error) => {
                setPostData({
                    authorNickname: '',
                    authorUsername: '',
                    authorPfpUrl: '',
                    date: new Date(),
                    content: '',
                    mediaUrls: [],
                });
                setState({
                    loading: false,
                    error: err,
                })
            })
    }, [settings.postUrl]);

    if (settings.postUrl === '') return (
        <PostPlaceholder>
            <p className="m-0">Paste post URL to see preview</p>
        </PostPlaceholder>
    )

    if (state.loading) return (
        <PostPlaceholder>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </PostPlaceholder>
    )

    if (state.error) return (
        <PostPlaceholder>
            <p className="m-0">{state.error.message}</p>
        </PostPlaceholder>
    )

    return (
        <div className="border rounded" style={{padding: '16px'}}>
            <div className="d-flex" style={{marginBottom: '10px'}}>
                <img src={postData.authorPfpUrl} alt="profile picture" className="rounded-1"
                     style={{height: '46px', marginInlineEnd: '10px'}}/>
                <div>
                    <p className="m-0 fw-bold">{postData.authorNickname}</p>
                    <p className="m-0" style={{opacity: '80%'}}>{postData.authorUsername}</p>
                </div>
            </div>
            <div>
                <p style={{marginBottom: "-1rem"}}
                   dangerouslySetInnerHTML={{__html: postData.content}}></p>
            </div>
            <div className="d-grid gap-1 overflow-hidden" style={{
                paddingTop: `${postData.mediaUrls.length != 0 ? "10px": ''}`,
                aspectRatio: "16/9",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
            }}>
                {postData.mediaUrls.map((url, index) => (
                    <img key={url} className="bg-black w-100 h-100 object-fit-contain rounded-1" src={url} alt="" style={
                        postData.mediaUrls.length == 1 ? {
                            gridColumn: "span 2",
                            gridRow: "span 2",
                        } : postData.mediaUrls.length == 2 ? {
                            gridRow: "span 2",
                        } : postData.mediaUrls.length == 3 && index == 1 ? {
                            gridRow: "span 2",
                        } : {}
                    }/>
                ))}
            </div>
        </div>
    )
}

function PostPlaceholder(props: any) {
    return (
        <div className="p-4 border rounded d-flex justify-content-center align-items-center" style={{minHeight: '150px'}}>
            {props.children}
        </div>
    )
}

async function getPostData(postUrl: URL): Promise<PostData> {
    let instance = postUrl.origin;
    let postId = postUrl.pathname.split('/')[2];

    const res = await fetch(`${instance}/api/v1/statuses/${postId}`);
    const data: any = await res.json();

    if (!res.ok) throw new Error(res.statusText);
    if (data.error) throw new Error(data.error);

    return {
        authorNickname: data.account.display_name,
        authorPfpUrl: data.account.avatar,
        authorUsername: `${data.account.acct}@${postUrl.hostname}`,
        content: data.content,
        date: new Date(data.created_at),
        mediaUrls: data.media_attachments.map((obj: any) => obj.url),
    };
}
