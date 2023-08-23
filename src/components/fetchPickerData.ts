// Only the fields that might be useful for my use case
export interface Account {
    // Screw union types, it's going to be compiled to JS anyway
    // and handling union types is a pain
    error?: string;
    id: string;
    username: string;
    acct: string;
    display_name: string;
    note: string;
    url: string;
    uri: string;
    avatar: string;
    header: string;
    followers_count: number;
    following_count: number;
    statuses_count: number;
}

export async function fetchBoosts(postUrl: URL): Promise<Account[]> {
    const instanceHost = postUrl.host;
    const instance = postUrl.origin;
    const postId = postUrl.pathname.split('/')[2];

    const boostEndpointUrl = `${instance}/api/v1/statuses/${postId}/reblogged_by`;
    return addDomainToAcctArr(
        await fetchPaginated(boostEndpointUrl) as Array<Account>,
        instanceHost,
    );
}

export async function fetchFollowers(acct: string): Promise<Account[]> {
    const acctArr = acct.split('@');
    const instanceHost = acctArr[2]
    const instance = 'https://' + instanceHost;
    const username = acctArr[1];

    const accLookupEndpoint = `${instance}/api/v1/accounts/lookup?acct=${username}`;
    const accLookupRes = await fetch(accLookupEndpoint);
    const accData: Account = await accLookupRes.json();

    if (!accLookupRes.ok) throw new Error(accLookupRes.statusText);
    if (accData.error) throw new Error(accData.error);

    const accountId = accData.id;
    const followersEndpointUrl = `${instance}/api/v1/accounts/${accountId}/followers`;
    return addDomainToAcctArr(
        await fetchPaginated(followersEndpointUrl) as Array<Account>,
        instanceHost,
    );
}

async function fetchPaginated(endpointUrl: string): Promise<any[]> {
    let reqUrl = endpointUrl;

    let dataArr: any[] = [];
    while (reqUrl) {
        const res = await fetch(reqUrl);
        const data: any | any[] = await res.json();

        if (!res.ok) throw new Error(res.statusText);
        if (data.error) throw new Error(data.error);

        dataArr = dataArr.concat(data);

        const linkHeader = res.headers.get('link');
        if (!linkHeader) {
            reqUrl = '';
            break;
        }
        const linkMatch = linkHeader.match(/<(.+?)>; rel="next"/);
        if (!linkMatch) {
            reqUrl = '';
            break;
        }
        reqUrl = linkMatch[1];
    }

    return dataArr;
}

async function addDomainToAcctArr(accountArr: Array<Account>, domain: string): Promise<Account[]> {
    const newArr: Array<Account> = [];
    accountArr.forEach(account => {
        if (account.acct.split('@').length === 1) {
            account.acct += '@' + domain;
        }
        newArr.push(account);
    });
    return newArr;
}