import React, { useState } from "react";
import { LinearProgress, Switch, FormGroup, FormControlLabel } from '@mui/material';
import Graph from './graph';

import './styling/slide.css'

import BNB from '../logos/bnb.png';
import HBAR from '../logos/hbar.png';
import WSM from '../logos/wsm.png';
import HNT from '../logos/hnt.png';
import IOT from '../logos/iot.png';
import LINK from '../logos/link.png';
import ETH from '../logos/eth.png';
import SOL from '../logos/sol.png';
import BTC from '../logos/btc.png';

export default ({ t, f, s, current, price, total }) => {
    const getImage = (s) => {
        return s === 'BNB' ? BNB : s === 'ETH' ? ETH : s === 'HBAR' ? HBAR : s === 'WSM' ? WSM : s === 'HNT' ? HNT : s === 'IOT' ? IOT : s === 'BTC' ? BTC : s === 'SOL' ? SOL : LINK;
    }

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const handleSwitchChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const totalPrice = price * current;

    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
                <header style={{ backgroundColor: 'white', position: 'relative', textAlign: 'left', padding: '4px', width: '40%' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className={`logo-container ${isHovered ? 'hidden' : ''}`}>
                   
                        <img src={getImage(s)} style={{ width: '50px', height: '50px', position: 'absolute', top: '50%', right: '50px', transform: 'translateY(-50%)' }} />
                    </div>
                    <div className={`content-container ${isHovered ? '' : 'hidden'}`}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={getImage(s)} style={{ width: '25px', height: '25px', padding: '1px' }} />
                                <p style={{ position: 'relative', top: '5px', left: '5px', width: '100%' }}>
                                    {t}  ({s})
                                </p>
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={isSwitchOn} onChange={handleSwitchChange} />} label={isSwitchOn ? '$' + (price) : null} />
                                {isSwitchOn ? (
                                    <React.Fragment>
                                        <p style={{
                                            fontWeight: 'bold',
                                            fontSize: '24px',
                                            color: 'navy',
                                            fontFamily: 'Roboto, sans-serif',
                                            margin: '0px',
                                            padding: '0px'
                                        }}>
                                            {current} {s}
                                        </p>
                                        <p style={{
                                            fontWeight: '300',
                                            fontSize: '16px',
                                            color: '#333333',
                                            fontFamily: 'Open Sans, sans-serif',
                                            margin: '5px 0px 0px',
                                            padding: '0px',
                                            position: 'relative',
                                            top: '-10px'
                                        }}>
                                            ≅${totalPrice.toFixed(2)}USD
                                        </p>
                                    </React.Fragment>) : null}

                            </FormGroup>
                        </div>
                    </div>

                </header>
                <div style={{ backgroundColor: 'lightblue', height: "100%", width: '100%', overflowY: 'auto' }}>
                    <LinearProgress variant='buffer' value={totalPrice / total * 100} valueBuffer={totalPrice / total} style={{ height: '6px' }} />
                    <div className={isSwitchOn ? 'sliding-content active' : 'sliding-content'} style={{ backgroundColor: 'lightblue' }}>
                        {isSwitchOn ? (<Graph id={f} />) : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
