import React from "react";
import Header from "../../widgets/Header";
import woman from "./pics/woman.png";
import icecream from "./pics/icecream.png";
import sing from "./pics/sing.gif";
import plant from "./pics/plant.png";

const About = () => {
    return (
        <div>
            <div className="container">
                <Header text={"Это мой менеджер контактов"} />
                <h1 className="h1">
                    Hi
                </h1>
                <div className="display-5">
                    What to say about me!
                </div>
            </div>
            <div>
                <img src={woman} alt="DDD" className={'m-5'} style={{maxHeight: '300px'}}/>
                <img src={icecream} alt="DDD" className={'m-3'} style={{ maxHeight: '300px' }} />
                <img src={sing} alt="DDD" className={'m-3'} style={{ maxHeight: '300px' }} />
                <img src={plant} alt="DDD" className={'m-3'} style={{ maxHeight: '300px' }} />
            </div>
        </div>
    );
}
export default About;