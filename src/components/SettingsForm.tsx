import {Button, Row} from "react-bootstrap";
import WinnerCountInput from "./settings-form/WinnerCountInput.tsx";
import MustFollowInput from "./settings-form/MustFollowInput.tsx";

export default function SettingsForm() {
    return (
        <Row className="g-3">
            <div>
                <WinnerCountInput />
            </div>
            <div>
                <MustFollowInput />
            </div>
            <div>
                <Button disabled={true} variant="outline-primary" className="mt-2 w-100">Continue</Button> {/*A better name might be 'Select winner'*/}
            </div>
        </Row>
    )
}
