import React from 'react';
import './kalendars.scss'

const Kalendars = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="11">Сентябрь 2023</th>
                </tr>
                <tr>
                    <th>WAKO Class</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Venue</th>
                    <th>City</th>
                    <th>WEB Address</th>
                    <th>Promoter</th>
                    <th>E-mail</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>WAKO PANAMERICA</td>
                    <td>7</td>
                    <td>10</td>
                    <td>WAKO Junior Pan-America Championships</td>
                    <td>Brazil</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>WAKO PANAMERICA paolo Zorelo</td>
                    <td>cbkickboxing@gmail.com</td>
                    <td>+5511991437672</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Kalendars;
