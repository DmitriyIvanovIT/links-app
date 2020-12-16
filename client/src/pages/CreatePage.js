import React, { useContext, useEffect, useState } from 'react';
import useHttpHook from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const CreatePage = () => {
    const history = useHistory();

    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');

    const {request} = useHttpHook();

    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate', 
                    'POST', 
                    {from: link},
                    {
                        Authorization: `Bearer ${auth.token}`
                    }
                );
                history.push(`/detail/${data.link._id}`);
            } catch (err) {}
        }
    };

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const onFocus = event => {

        if(event.target.autocomplete)
        {
            event.target.autocomplete = "whatever";
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="link" 
                        type="text"
                        onFocus={onFocus}
                        autoComplete="off"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="email">Вставьте ссылку</label>
                </div>
            </div>
        </div>
    )
};

export default CreatePage;