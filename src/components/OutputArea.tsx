import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';
import { ImageProcess } from '~/lib/ImageProcess';
import { Data } from '~/constants/DataStructure';
import { TextButton } from './TextButton';

type Props = {
    className?: string;
    data: Data;
    execute: string;
}

export const OutputArea = (props: Props) => {

    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {

        console.log('call');

        if(canvasRef.current != undefined){

            const imageProcess = new ImageProcess(canvasRef.current);

            imageProcess.draw(props.data);
            
            console.log(props.data);
        }

    }, [props.execute]);

    const onDownload = () => {

        if(canvasRef.current != undefined){
            let base64 = canvasRef.current.toDataURL('image/png');
            let bin = atob(base64.split(',')[1]);
            let buffer = new Uint8Array(bin.length);

            for (let i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }

            let blob = new Blob([buffer.buffer as BlobPart], {type: 'image/png'});
        
            let link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = 'canvas.png';
            link.click();
        }
        
    }

    return (
        <div>
            <Container className={props.className}>
                <OutputCanvas ref={canvasRef} />
                <OverlayText>Output</OverlayText>
            </Container>
            <DownloadButton label="Download" onClick={() => { onDownload() }}></DownloadButton>
        </div>
        
    )

}


const Container = styled.div`
    position: relative;
`;

const OutputCanvas = styled.canvas`
    border: 1px #666 dashed;
    color: #999;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 150px;
    height : 150px;
    z-index: 1;
`;

const OverlayText = styled.div`
    position: absolute;
    z-index: 3;
    top: 0;

    color: #999;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    width: 150px;
    height: 150px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const DownloadButton = styled(TextButton)`
    margin-top: 20px;
`;