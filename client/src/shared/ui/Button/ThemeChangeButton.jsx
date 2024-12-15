import React, { useState, useEffect } from 'react';
import "../../../App.css";
import Button from './Button';
import Cookies from "js-cookie"; // Установите пакет с помощью npm i js-cookie


const ThemeChangeButton = ({ style }) => {
    const themeRoot = document.getElementById("root");
    themeRoot.setAttribute("data-bs-theme", "dark");

    const initialTheme = Cookies.get('theme') || 'light';

    const [rootState, setRoot] = useState(initialTheme);
    const [text, setText] = useState(rootState === 'dark' ? '🌙' : '☀️');

    useEffect(() => {
        themeRoot.setAttribute('data-bs-theme', rootState);
        rootState === 'dark' 
            ? themeRoot.setAttribute('style', 'background-color:rgb(54, 61, 68); color: white') 
            : themeRoot.setAttribute('style', 'background-color:rgb(167, 194, 146);');
        Cookies.set('theme', rootState, { expires: 1 });
        
    }, [rootState])  

    function toggleTheme(event) {
        console.log("works");
        event.preventDefault();
        if (rootState === 'light') {
            setText(`🌙`);
            setRoot("dark");
        } else if (rootState === 'dark') {
            setText(`☀️`);
            setRoot("light");
        }
    }

    return(
        <Button style={style} text={text} btnFunction={toggleTheme} />
    );
}
export default ThemeChangeButton;