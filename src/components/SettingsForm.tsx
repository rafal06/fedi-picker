import {Button, FormControl, FormLabel, FormText, Row} from "react-bootstrap";
import {useContext, useState} from "preact/hooks";
import {SettingsContext} from "./SettingsContext.tsx";

export default function SettingsForm() {
    const { settings, setSettings } = useContext(SettingsContext);

    const handleWinnerCountChange = event => {
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

    const handleWinnerCountBlur = event => {
        if (event.target.value == 0) {
            setSettings({
                ...settings,
                winnerCount: 1,
            })
        }
    }

    const [isCorrectUsernameFormat, setIsCorrectUsernameFormat] = useState(true);
    const [isFirstMustFollowInput, setIsFirstMustFollowInput] = useState(true);

    const handleMustFollowChange = event => {
        const userArr: Array<string> = [];
        event.target.value.split(',').forEach(value => {
            value = value.trim();
            if (value !== '') userArr.push(value);
        });

        setSettings({
            ...settings,
            mustFollow: userArr,
        });

        if (userArr.length === 0) {
            setIsCorrectUsernameFormat(true);
            return;
        }

        for (const username of userArr) {
            if (/@[^\s@,]+?@[^\s@,]+?\.[^\s@,]+/i.test(username)) continue;

            setIsCorrectUsernameFormat(false);
            return;
        }

        setIsCorrectUsernameFormat(true);
    }

    const handleMustFollowBlur = event => {
        setIsFirstMustFollowInput(false);
        handleMustFollowChange(event);
        if (settings.mustFollow.length === 0) {
            setIsCorrectUsernameFormat(false);
        }
    }

    return (
        <Row className="g-3">
            <div>
                <FormLabel>Number of winners</FormLabel>
                <FormControl type="number" min={1}
                             value={settings.winnerCount}
                             onChange={handleWinnerCountChange}
                             onBlur={handleWinnerCountBlur} />
            </div>
            <div>
                <FormLabel>Must follow</FormLabel>
                <FormControl placeholder="@someone@example.social"
                             isInvalid={!isCorrectUsernameFormat}
                             onChange={isFirstMustFollowInput ? undefined : handleMustFollowChange}
                             onBlur={handleMustFollowBlur}/>
                <FormText>Separate usernames with a comma</FormText>
            </div>
            <div>
                <Button disabled={true} variant="outline-primary" className="mt-2 w-100">Continue</Button> {/*A better name might be 'Select winner'*/}
            </div>
        </Row>
    )
}
