import {FormControl, FormLabel} from "react-bootstrap";
import {useContext} from "preact/hooks";
import {SettingsContext} from "../SettingsContext.tsx";

export default function PostUrlInput() {
    const { settings, setSettings } = useContext(SettingsContext);

    const handleChange = event => {
        setSettings({
            ...settings,
            postUrl: event.target.value,
        })
    }

    return (
        <>
            <FormLabel>Post URL</FormLabel>
            <FormControl placeholder="https://example.social/@someone/110815462944644507"
                         value={settings.postUrl}
                         onInput={handleChange} />
        </>
    )
}
