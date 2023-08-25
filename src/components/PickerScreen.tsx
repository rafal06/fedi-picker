import {Button, Container, Spinner} from "react-bootstrap";
import {useContext, useEffect, useState} from "preact/hooks";
import {ComponentRouterContext} from "./ComponentRouter.tsx";
import Form from "./Form.tsx";
import {Account, fetchBoosts, fetchFollowers} from "./fetchPickerData.ts";
import {SettingsContext} from "./SettingsContext.tsx";
import ProfileCard from "./ProfileCard.tsx";

export default function PickerScreen() {
    const { setComponentRoute } = useContext(ComponentRouterContext);
    const { settings } = useContext(SettingsContext);
    const [state, setState] = useState<{
        loading: boolean,
        error: null | Error,
        data: null | Array<Account>,
        winners: null | Array<Account>,
    }>({
        loading: true,
        error: null,
        data: null,
        winners: null,
    });

    const drawWinners = (accountArr: Array<Account>, doSetState: boolean = false): Array<Account> => {
        const winners: Array<Account> = [];
        for (let i = 0; i < settings.winnerCount; i++) {
            const winnerIndex = Math.floor(Math.random() * accountArr.length);
            winners.push(accountArr[winnerIndex]);
            accountArr.splice(winnerIndex, 1);
        }
        if (doSetState) setState({
            ...state,
            winners: winners,
        });
        return winners;
    }

    useEffect(() => {
        (async () => {
            const boosters: Array<Account> = settings.interactionFilter.boosted ? await fetchBoosts(new URL(settings.postUrl)) : [];
            let followers: Array<Account> = [];
            for (const acct of settings.mustFollow) {
                followers = followers.concat(await fetchFollowers(acct));
            }

            let filteredArr: Array<Account> = [];
            if (settings.mustFollow.length === 0) {
                filteredArr = boosters;
            } else {
                for (const booster of boosters) {
                    for (const follower of followers) {
                        if (booster.acct == follower.acct) {
                            filteredArr.push(booster);
                        }
                    }
                }
            }

            setState({
                loading: false,
                error: null,
                data: filteredArr,
                winners: drawWinners(filteredArr),
            });

        })().catch((err: Error) => {
            setState({
                loading: false,
                error: err,
                data: null,
                winners: null,
            });
        });
    }, [settings]);

    if (state.loading) return (
        <CenterContainer>
            <Spinner className="mb-3" />
            <p>Loading data...</p>
            {/* TODO: Display info on what is being fetched at that moment */}
            <Button onClick={() => setComponentRoute(<Form />)}>Go back</Button>
        </CenterContainer>
    )

    if (state.error) return (
        <CenterContainer>
            <h2 class="fs-4">Error loading data</h2>
            <p>{state.error.message}</p>

            <div class="d-flex">
                <Button variant="outline-primary" onClick={() => setComponentRoute(<Form />)}>Go back</Button>
                <Button className="ms-3" onClick={() => {}}>Retry</Button>
            </div>
        </CenterContainer>
    )

    return (
        <CenterContainer>
            <h1 className="fs-2 mb-4">The winner{settings.winnerCount > 1 ? 's are': ' is'}...</h1>
            <div class="d-flex flex-column gap-3">
                {state.winners?.map(account => (
                    <ProfileCard account={account} />
                ))}
            </div>
            <div class="mt-4 d-flex gap-4">
                <Button variant="outline-secondary"
                    onClick={() => setComponentRoute(<Form />)}>Go back</Button>
                <Button variant="outline-secondary"
                    onClick={() => drawWinners(state.data as Array<Account>, true)}>Redraw winner{settings.winnerCount > 1 ? 's': ''}</Button>
            </div>
        </CenterContainer>
    )
}

function CenterContainer(props: any) {
    return (
        <Container as="main"
                   className="p-3 my-3 d-flex flex-column justify-content-center align-items-center"
                   style={{flex: '1', maxWidth: '960px'}}>
            {props.children}
        </Container>
    )
}
