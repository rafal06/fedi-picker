import {FormControl, FormLabel, FormText} from "react-bootstrap";
import {useContext, useState} from "preact/hooks";
import {SettingsContext} from "../SettingsContext.tsx";

export default function MustFollowInput() {
    const { settings, setSettings } = useContext(SettingsContext);

    const [isCorrectFormat, setIsCorrectFormat] = useState(true);
    const [isFirstInput, setIsFirstInput] = useState(true);

    const handleChange = (event: any) => {
        const userArr: Array<string> = [];
        event.target.value.split(',').forEach((value: string) => {
            value = value.trim();
            if (value !== '') userArr.push(value);
        });

        setSettings({
            ...settings,
            mustFollow: userArr,
        });

        if (userArr.length === 0) {
            setIsCorrectFormat(true);
            return;
        }

        for (const username of userArr) {
            if (/@[^\s@,]+?@[^\s@,]+?\.[^\s@,]+/i.test(username)) continue;

            setIsCorrectFormat(false);
            return;
        }

        setIsCorrectFormat(true);
    }

    const handleBlur = (event: any) => {
        setIsFirstInput(false);
        handleChange(event);
        if (settings.mustFollow.length === 0) {
            setIsCorrectFormat(false);
        }
    }

    return (
        <>
            <FormLabel>Must follow</FormLabel>
            <FormControl placeholder="@someone@example.social"
                         isInvalid={!isCorrectFormat}
                         onChange={isFirstInput ? undefined : handleChange}
                         onBlur={handleBlur}/>
            <FormText>Separate usernames with a comma</FormText>
        </>
    )
}
