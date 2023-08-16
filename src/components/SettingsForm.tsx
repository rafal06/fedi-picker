import {Button, Row} from "react-bootstrap";
import WinnerCountInput from "./settings-form/WinnerCountInput.tsx";
import MustFollowInput from "./settings-form/MustFollowInput.tsx";
import InteractionFilter from "./settings-form/InteractionFilter.tsx";
import {useContext} from "preact/hooks";
import {SettingsContext} from "./SettingsContext.tsx";
import {PostDataContext} from "./PostDataContext.tsx";

export default function SettingsForm() {
    const { settings } = useContext(SettingsContext);
    const { postData } = useContext(PostDataContext);

    return (
        <Row className="g-3">
            <div>
                <WinnerCountInput />
            </div>
            <div>
                <MustFollowInput />
            </div>
            <div>
                <InteractionFilter />
            </div>
            <div>
                <Button variant="outline-primary"
                        className="mt-2 w-100"
                        disabled={!(postData.authorUsername && (settings.interactionFilter.boosted || settings.interactionFilter.replied))}
                >Continue</Button> {/*A better name might be 'Select winner'*/}
            </div>
        </Row>
    )
}
