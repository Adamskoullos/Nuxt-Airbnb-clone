export default function (context, inject){
    const appId = 'TYXL792H4N';
    const apiKey = '51f33c33e7369213b7911b5d2fa92608';

    inject('dataApi', { getHome, getReviewsByHomeId });

    async function getHome(homeId) {
        try{
            const res = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
                headers: {
                    'X-Algolia-API-Key': apiKey,
                    'X-Algolia-Application-Id': appId,
                }
            });
            const data = await res.json();
            return data;
        } catch(err){
            console.log(err.message);

        }
    }

    async function getReviewsByHomeId(homeId) {
        try{
            const res = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers: {
                    'X-Algolia-API-Key': apiKey,
                    'X-Algolia-Application-Id': appId,
                },
                method: 'POST', 
                body: JSON.stringify({
                    filters: `homeId:${homeId}`
                })
            });
            const data = await res.json();
            return data;
        } catch(err){
            console.log(err.message);

        }
    }
}