import {FormControl, FormLabel} from "react-bootstrap";
import {useContext} from "preact/hooks";
import {SettingsContext} from "../SettingsContext.tsx";

export default function WinnerCountInput() {
    const { settings, setSettings } = useContext(SettingsContext);

    const handleChange = (event: any) => {
        const newValue = Number(event.target.value);
        if (newValue < 0) {
            setSettings({...settings});
            return;
        }

        setSettings({
            ...settings,
            winnerCount: newValue,
        })
    }

    const handleBlur = (event: any) => {
        if (event.target.value == 0) {
            setSettings({
                ...settings,
                winnerCount: 1,
            })
        }
    }

    return (
        <>
            <FormLabel>Number of winners</FormLabel>
            <FormControl type="number" min={1}
                         value={settings.winnerCount}
                         onChange={handleChange}
                         onBlur={handleBlur} />
        </>
    )
}
