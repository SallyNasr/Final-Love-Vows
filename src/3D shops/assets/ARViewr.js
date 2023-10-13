import React, { useEffect } from 'react';
import ThreeDModel from './ThreeDModel';

function ARViewer() {
    useEffect(() => {
        const enterAR = () => {
            const scene = document.querySelector('a-scene');

            // Add your AR content here.
            <ThreeDModel />
            // For example, you can add a 3D model.
            const model = document.createElement('a-box');
            model.setAttribute('position', '0 1.5 -3');
            model.setAttribute('color', 'red');
            scene.appendChild(model);
        };

        // Check if AR is supported on the device
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                if (supported) {
                    // Show a button to enter AR mode
                    const arButton = document.createElement('button');
                    arButton.innerText = 'Enter AR';
                    arButton.addEventListener('click', () => {
                        navigator.xr
                            .requestSession('immersive-ar')
                            .then((session) => {
                                session.addEventListener('end', () => {
                                    // Handle the session ending (e.g., user exits AR)
                                });
                                enterAR();
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    });
                    document.body.appendChild(arButton);
                } else {
                    console.log('AR not supported on this device.');
                }
            });
        }
    }, []);

    return <div></div>;
}

export default ARViewer;
