import React, { useCallback, useContext, useEffect, useState } from 'react';
import ListLinks from '../Components/ListLinks';
import Loader from '../Components/Loader';
import AuthContext from '../context/AuthContext';
import useHttpHook from '../hooks/http.hook';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttpHook();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLinks(fetched);
        } catch (e) {

        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <ListLinks links={links}/>}
        </>
    )
};

export default LinksPage;