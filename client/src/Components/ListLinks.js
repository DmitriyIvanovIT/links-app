import React from 'react';
import { Link } from 'react-router-dom';

const ListLinks = ({ links }) => {
    if (!links.length) {
        return <p className="center">Ссылок пока нет</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
            </tr>
            </thead>
    
            <tbody>
                { links.map((link, i) => (
                    <tr key={link._id}>
                        <td>{i+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Перейти</Link>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
};

export default ListLinks;