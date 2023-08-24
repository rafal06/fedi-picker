import {Button} from "react-bootstrap";
import {Account} from "./fetchPickerData.ts";

export default function ProfileCard(props: { account: Account }) {
    return (
        <div className="border rounded overflow-hidden" style={{width: '580px'}}>
            <img className="w-100" src={props.account.header} alt="header image"
                 style={{height: 145, objectFit: 'cover'}}/>
            <div style={{paddingInline: 20, paddingBottom: 3}}>
                <div className="d-flex justify-content-between align-items-end"
                     style={{marginTop: -45}}>
                    <img className="rounded" src={props.account.avatar} alt="profile picture"
                         style={{width: 90}}/>
                    <Button as="a" href={props.account.url} target="_blank">Open profile</Button>
                </div>
                <div style={{marginBlock: 16}}>
                    <h2 className="m-0 fw-bold" style={{fontSize: 19}}>{props.account.display_name}</h2>
                    <small className="text-secondary" style={{fontSize: 15}}>@{props.account.acct}</small>
                </div>
                <div dangerouslySetInnerHTML={{__html: props.account.note}}></div>
            </div>
        </div>
    )
}