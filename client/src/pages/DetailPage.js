import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../Components/LinkCard';
import Loader from '../Components/Loader';
import AuthContext from '../context/AuthContext';
import useHttpHook from '../hooks/http.hook';

const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttpHook();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setLink(fetched);
        } catch (e) {

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && link && <LinkCard link={link}/> }
        </>
    )
};

export default DetailPage;