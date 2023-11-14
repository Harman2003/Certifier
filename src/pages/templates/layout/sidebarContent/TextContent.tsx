import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import axios from 'axios';
import { getThumbnail } from '../../utils/thumbnail';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@lidojs/editor';
import { LayerId, SerializedLayers } from '@lidojs/core';
import { headings } from '../../utils/data';
interface Text {
    img: string;
    data: string;
}
const TextContent: FC<{ onClose: () => void }> = ({ onClose }) => {
    const { actions } = useEditor();
  
    const handleMobileScreen = () => {
        if (isMobile) {
            onClose();
        }
    };
    return (
        <div
            css={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflowY: 'auto',
                display: 'flex',
                backgroundColor: 'hsla(0,0%,100%,.07)',
            }}
        >
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    height: 48,
                    borderBottom: '1px solid hsla(0,0%,100%,.5)',
                    padding: '0 20px',
                }}
            >
                <p
                    css={{
                        lineHeight: '48px',
                        fontWeight: 600,
                        color: 'whitesmoke',
                        flexGrow: 1,
                    }}
                >
                    Text
                </p>
                <div
                    css={{
                        fontSize: 20,
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={onClose}
                >
                    <XIcon />
                </div>
            </div>
            <div css={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}>
                <div
                    css={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'grid',
                        padding: '16px',
                        color: 'whitesmoke',
                    }}
                >
                    <div
                        css={{
                            height: '60px',
                            backgroundColor: 'hsla(0,0%,100%,.15)',
                            paddingLeft: '10px',
                            fontSize: '26px',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Abril Fatface, serif',
                        }}
                        onClick={() => {
                            actions.addLayer(headings[0]);
                            handleMobileScreen();
                        }}
                    >
                        <div>Add a heading</div>
                    </div>
                    <div
                        css={{
                            height: '60px',
                            backgroundColor: 'hsla(0,0%,100%,.15)',
                            paddingLeft: '10px',
                            fontSize: '17px',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Abril Fatface, serif',
                            letterSpacing: '1px',
                        }}
                        onClick={() => {
                            actions.addLayer(headings[1]);
                            handleMobileScreen();
                        }}
                    >
                        Add a subheading
                    </div>
                    <div
                        css={{
                            height: '60px',
                            backgroundColor: 'hsla(0,0%,100%,.15)',
                            paddingLeft: '10px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => {
                            actions.addLayer(headings[2]);
                            handleMobileScreen();
                        }}
                    >
                        Add a little bit of body text
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextContent;
