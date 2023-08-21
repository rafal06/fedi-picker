import {FormCheck, FormText, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useContext} from "preact/hooks";
import {SettingsContext} from "../SettingsContext.tsx";

export default function InteractionFilter() {
    const { settings, setSettings } = useContext(SettingsContext);

    const handleBoostedChange = (event: any) => {
        setSettings({
            ...settings,
            interactionFilter: {
                ...settings.interactionFilter,
                boosted: event.target.checked,
            },
        });
    }
    const handleRepliedChange = (event: any) => {
        setSettings({
            ...settings,
            interactionFilter: {
                ...settings.interactionFilter,
                replied: event.target.checked,
            },
        });
    }

    return (
        <>
            <h3 className="fs-5 fs" style={{marginBottom: ".6rem"}}>Select winner from people who...</h3>
            <FormCheck label="boosted the post"
                       id="boosted"
                       checked={settings.interactionFilter.boosted}
                       onChange={handleBoostedChange} />
            <OverlayTrigger placement="right"
                            overlay={
                                <Tooltip>
                                    Filtering by replies is not yet implemented,
                                    since it would require authentication to fetch more than 60 replies
                                </Tooltip>
                            }>
                <span class="d-inline-block">
                    <FormCheck label="replied to the post"
                               id="replied"
                               checked={settings.interactionFilter.replied}
                               onChange={handleRepliedChange}
                               disabled={true /*To be implemented*/}
                               style={{pointerEvents: 'none'}}/>
                </span>
            </OverlayTrigger>
            <FormText className="d-block">You must select at least one of the options</FormText>
        </>
    )
}