interface PostPreviewProps {
    authorPfpUrl: string,
    authorNick: string,
    authorUsername: string,
    contents: string,
}

export default function PostPreview(props: PostPreviewProps) {
    return (
        <div className="border rounded" style={{padding: '16px'}}>
            <div className="d-flex" style={{marginBottom: '10px'}}>
                <img src={props.authorPfpUrl} alt="profile picture" className="rounded-1" style={{height: '46px', marginInlineEnd: '10px'}}/>
                <div>
                    <p className="m-0 fw-bold">{props.authorNick}</p>
                    <p className="m-0" style={{opacity: '80%'}}>{props.authorUsername}</p>
                </div>
            </div>
            <div>
                <p className="m-0">{props.contents}</p>
            </div>
        </div>
    )
}
